import { SubNode } from './targets';
import { SsBase64, SsSip002, SsSip008, SsSubNode } from './targets/shadowsocks';
import { ClashSs } from './targets/clash/clash-ss';

addEventListener('fetch',(event) => {
  event.respondWith(Handler(event.request));
})

const getSub = async (url: string): Promise<string> => {
  return await (await fetch(url)).text();
}

const Handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  if(url.pathname != '/sub') {
    return new Response(null, {status: 404});
  }

  const search = url.searchParams;
  const fromType = search.get('from');
  const convertType = search.get('to');
  const fromUrl = search.get('fromUrl');

  if(fromType && convertType) {

    let fromObj: SubNode[] = [];
    let result: string = "";
    let sub = "";

    if (req.method === 'GET') {
      sub = await getSub(fromUrl);
    } else if (req.method === 'POST') {
      sub = await req.text()
    }

    switch (fromType) {
      case 'ssbase64':
        fromObj = SsBase64.parse(sub);
        break;
      case 'sssip002':
        fromObj = SsSip002.parse(sub);
        break;
      case 'sssip008':
        fromObj = SsSip008.parse(sub);
        break;
      case 'clashss':
        fromObj = ClashSs.parse(sub);
        break;
    }

    switch (convertType) {
      case 'ssbase64':
        result = SsBase64.stringfy(fromObj as SsSubNode[]);
        break;
      case 'sssip002':
        result = SsSip002.stringfy(fromObj as SsSubNode[]);
        break;
      case 'sssip008':
        result = SsSip008.stringfy(fromObj as SsSubNode[]);
        break;
      case 'clashss':
        result = ClashSs.stringfy(fromObj as SsSubNode[]);
        break;
    }

    return new Response(result, {status: 200});
  } else {
    return new Response("", {status: 400});
  }
}
