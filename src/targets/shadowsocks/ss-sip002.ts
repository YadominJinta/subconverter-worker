import { Target } from '../target';
import { SsSubNode } from './index';

/*
SIP002 即 `ss://...`形式
```
SS-URI = "ss://" userinfo "@" hostname ":" port [ "/" ] [ "?" plugin ] [ "#" tag ]
userinfo = websafe-base64-encode-utf8(method  ":" password)
```

*/
export class SsSip002 extends Target {

  static parseSingle(text: string): SsSubNode{
    const url = new URL(text);
    if(url.protocol != 'ss') {
      throw new Error("Protocol not match, required ss://");
    }

    const search = new URLSearchParams(url.search);
    const [method, password] = atob(url.username).split(':');
    const plugin_str = search.get('plugin');
    let plugin: string;
    let plugin_opts: {[index:string]:string} = {};
    if (plugin_str) {
      let plugin_arr = plugin_str.split(';');
      plugin = plugin_arr.slice(0,1)[0];
      plugin_arr.forEach(plugin_opt => {
        const [key,value] = plugin_opt.split('=');
        plugin_opts[key] = value;
      })
    }

    return {
      type: 'ss',
      tag: decodeURI(url.hash).replace('#',''),
      host: url.hostname,
      port: parseInt(url.port),
      password: password,
      method: method,
      plugin,
      plugin_opts
    }
  }

  public static stringfySingle(value: SsSubNode): string {
    if(value.type != 'ss') {
      throw new Error("Type not match, required ss");
    }

    const url = new URL('ss://');
    url.hostname = value.host;
    url.port = value.port.toFixed(0);
    url.username = btoa(`${value.method}:${value.password}`);
    url.hash = encodeURI('#' + value.tag);

    const search = new URLSearchParams();
    const plugin = value.plugin;
    let plugin_opts = "";
    Object.entries(value.plugin_opts).forEach((k,v) => {
      plugin_opts += `;${k}=${v}`
    })
    search.set('plugin', plugin + plugin_opts);
    url.search = search.toString()
    return url.href;

  }

  public static stringfy(value: SsSubNode[]): string {
    let result = "";
    value.forEach(v => {
      result += SsSip002.stringfySingle(v) + "\n";
    });
    return result;
  }

  public static parse(text: string): SsSubNode[] {
    return text.split('\n').map(line => {
      return SsSip002.parseSingle(line);
    })
  }
}
