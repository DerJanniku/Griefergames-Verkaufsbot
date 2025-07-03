import { Bot } from 'mineflayer';
import { Command } from '../core/Command';

export const befehl: Command = {
  name: 'hilfe',
  description: 'Zeigt eine Liste aller verfügbaren Befehle an.',
  aliases: ['help', 'commands'],
  permissions: ['user'],
  cooldown: 5,
  execute: (bot: Bot, username: string, _args: string[]) => {
    // Diese Logik wird später implementiert, um Befehle dynamisch aufzulisten.
    bot.chat(`/msg ${username} Verfügbare Befehle: !hilfe, !switch`);
  },
};
