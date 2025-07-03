import { Plugin } from '../core/Plugin';
import { VerkaufsBot } from '../core/Bot';

let antiAfkInterval: NodeJS.Timeout | null = null;

export const plugin: Plugin = {
  name: 'AntiAFK',
  description: 'Verhindert, dass der Bot wegen Inaktivität gekickt wird.',
  laden(botInstance: VerkaufsBot): void {
    const bot = botInstance.getBot();
    antiAfkInterval = setInterval(() => {
      bot.swingArm('right');
    }, 30 * 1000);
    console.log('[Plugin] AntiAFK-Plugin geladen und aktiviert.');
  },
  entladen(): void {
    if (antiAfkInterval) {
      clearInterval(antiAfkInterval);
      antiAfkInterval = null;
      console.log('[Plugin] AntiAFK-Plugin entladen und deaktiviert.');
    }
  },
};
