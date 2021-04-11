export interface ClashNode {
  name: string,
  type: string,
  server: string,
  port: number,
  cipher: string
}

export interface ClashSsNode extends ClashNode {
  password: string,
  plugin: string,
  'plugin-opts': {[index:string]:string}
}
