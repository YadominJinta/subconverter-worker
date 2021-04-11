import { SsSubNode } from './index';

interface SsSip008Node {
  remark: string,
  server: string,
  server_port: number,
  password: string,
  method: string,
  plugin?: string,
  plugin_opts?: string
}

export class SsSip008 {
  public static parse(text: string): SsSubNode[] {
    const value: SsSip008Node[] = JSON.parse(text);

    return value.map(v => {
      let plugin_opts: { [index: string]: string } = {};
      const plugin_str = v.plugin_opts;
      if (plugin_str) {
        let plugin_arr = plugin_str.split(';');
        plugin_arr.forEach(plugin_opt => {
          const [key, value] = plugin_opt.split('=');
          plugin_opts[key] = value;
        });
      }
      return {
        type: 'ss',
        tag: v.remark,
        host: v.server,
        port: v.server_port,
        password: v.password,
        method: v.method,
        plugin: v.plugin,
        plugin_opts
      }
    });
  }

  public static stringfy(value: SsSubNode[]): string {
    const result: SsSip008Node[] = value.map((v) => {
      try {
        if (v.plugin) {
          let plugin_opts = Object.entries(v.plugin_opts).map(([k, v]) => {
            return `${k}=${v}`
          }).join(';');
          return {
            remark: v.tag,
            server: v.host,
            server_port: v.port,
            password: v.password,
            plugin: v.plugin,
            plugin_opts: plugin_opts,
            method: v.method
          }
        } else {
          return {
            remark: v.tag,
            server: v.host,
            server_port: v.port,
            password: v.password,
            method: v.method
          }
        }
      } catch (e) {
        console.log(e);
        console.table(v);
      }
    })
    return JSON.stringify(result);
  }
}
