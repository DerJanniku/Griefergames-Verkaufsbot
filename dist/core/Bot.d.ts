import 'dotenv/config';
import { Bot } from 'mineflayer';
import { Datenbank } from './Datenbank';
export declare class VerkaufsBot {
    bot: Bot;
    private botState;
    datenbank: Datenbank;
    constructor();
    getBot(): Bot;
    private registriereEvents;
}
