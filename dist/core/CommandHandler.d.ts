import { Bot } from 'mineflayer';
export declare class CommandHandler {
    private bot;
    private readonly commands;
    private readonly cooldowns;
    private readonly prefix;
    private readonly admins;
    constructor(bot: Bot);
    private ladeBefehle;
    private registriereChatEvent;
    private hatBerechtigung;
}
