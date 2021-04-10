import { Target} from '../target';
import { SsSip002 } from './ss-sip002';
import { SsSubNode } from './index';



class SsBase64 extends Target {
  constructor() {
    super();
  }

  stringfy(value: SsSubNode[]): string {
    return btoa(SsSip002.stringfy(value));
  }

  parse(text: string): SsSubNode[] {
    const decodeText = atob(text);
    return SsSip002.parse(decodeText);

  }
}

