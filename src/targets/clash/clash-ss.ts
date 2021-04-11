import { ClashSsNode } from './index';
import * as YAML from 'yaml';
import { SsSubNode } from '../shadowsocks';

export class ClashSs {

  public static parse(text: string): SsSubNode[] {
    let value = YAML.parse(text)['proxies'] as ClashSsNode[];
    value = value.filter((v) => {
      return v.type === 'ss';
    });

    return value.map((v) => {
      const result: SsSubNode =  {
        type: v.type,
        tag: v.name,
        host: v.server,
        port: v.port,
        password: v.password,
        method: v.cipher
      }

      if(v.plugin) {
        result.plugin = v.plugin;
        result.plugin_opts = v['plugin-opts'];
      }

      return result;
    })
  }

  public static stringfy(value: SsSubNode[]): string  {
    const nodes: ClashSsNode[] = value.map(v => {
      try {
        const result: ClashSsNode =  {
          type: v.type,
          name: v.tag,
          server: v.host,
          port: v.port,
          password: v.password,
          cipher: v.method,
        };

        if (v.plugin) {
          result.plugin = v.plugin;
          result['plugin-opts'] = v.plugin_opts;
        }

        return result;
      } catch (e) {
        console.log(e);
        console.log(v);
      }
    });


    return YAML.stringify({
      proxies: nodes
    });
  }
}
