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
      return {
        type: v.type,
        tag: v.name,
        host: v.server,
        port: v.port,
        password: v.password,
        method: v.cipher,
        plugin: v.plugin,
        plugin_opts: v['plugin-opts'],
      }
    })
  }

  public static stringfy(value: SsSubNode[]): string  {
    const nodes: ClashSsNode[] = value.map(v => {
      try {
        return {
          type: v.type,
          name: v.tag,
          server: v.host,
          port: v.port,
          password: v.password,
          cipher: v.method,
          plugin: v.plugin,
          'plugin-opts': v.plugin_opts
        }
      } catch (e) {
        console.log(e);
        console.log(v);
      }
    });

    console.log(YAML);

    return YAML.stringify({
      proxies: nodes
    });
  }
}
