import { Bot } from 'mineflayer';
export interface Command {
    name: string;
    description: string;
    aliases: string[];
    permissions: ('admin' | 'user')[];
    cooldown: number;
    execute: (bot: Bot, username: string, args: string[]) => void;
}
