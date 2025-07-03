import { VerkaufsBot } from './Bot';

export interface Plugin {
  name: string;
  description: string;
  laden(bot: VerkaufsBot): void;
  entladen(bot?: VerkaufsBot): void;
}
