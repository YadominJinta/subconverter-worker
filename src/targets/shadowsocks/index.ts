import { SubNode } from '../index';

export interface SsSubNode extends SubNode {
  password: string,
  plugin?: string
  plugin_opts?: {
    [index:string]: string
  }
}

export * from './ss-base64';
export * from './ss-sip002';
export * from './ss-sip008';
