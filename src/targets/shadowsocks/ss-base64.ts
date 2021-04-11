import { SsSip002 } from './ss-sip002';
import { SsSubNode } from './index';

export class SsBase64 {

  public static stringfy(value: SsSubNode[]): string {
    return btoa(SsSip002.stringfy(value));
  }

  public static parse(text: string): SsSubNode[] {
    const decodeText = atob(text);
    return SsSip002.parse(decodeText);

  }
}

