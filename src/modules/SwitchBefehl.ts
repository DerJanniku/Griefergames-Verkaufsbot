import { Bot } from 'mineflayer';
import { Command } from '../core/Command';

export const befehl: Command = {
  name: 'switch',
  description: 'Wechselt zu einem angegebenen CityBuild.',
  aliases: ['cb'],
  permissions: ['admin'],
  cooldown: 10,
  execute: (bot: Bot, username: string, args: string[]) => {
    if (args.length === 0) {
      bot.chat(`/msg ${username} Bitte gib einen CityBuild an. Beispiel: !switch cb10`);
      return;
    }
    const cityBuild = args[0];
    bot.chat(`/switch ${cityBuild}`);
    bot.chat(`/msg ${username} Wechsle zu ${cityBuild}...`);
  },
};
