import 'dotenv/config';
import { createBot, Bot, BotOptions } from 'mineflayer';
import { CommandHandler } from './CommandHandler';
import { PluginHandler } from './PluginHandler';
import { Datenbank } from './Datenbank';

type BotState = 'INITIAL' | 'SWITCHING' | 'TELEPORTING' | 'READY';

export class VerkaufsBot {
  public bot: Bot;
  private botState: BotState = 'INITIAL';
  public datenbank: Datenbank;

  constructor() {
    if (!process.env.MINECRAFT_EMAIL || !process.env.MINECRAFT_PASSWORD) {
      console.error(
        '[Fehler] MINECRAFT_EMAIL und MINECRAFT_PASSWORD müssen in der .env-Datei gesetzt sein.',
      );
      process.exit(1);
    }

    const options: BotOptions = {
      host: process.env.SERVER_HOST,
      port: parseInt(process.env.SERVER_PORT || '25565', 10),
      username: process.env.MINECRAFT_EMAIL,
      password: process.env.MINECRAFT_PASSWORD,
      version: process.env.SERVER_VERSION,
      auth: process.env.AUTH_METHOD === 'microsoft' ? 'microsoft' : 'mojang',
    };

    this.bot = createBot(options);
    this.datenbank = new Datenbank();
    this.datenbank.verbinden();
    new CommandHandler(this.bot);
    new PluginHandler(this);
    this.registriereEvents();
  }

  public getBot(): Bot {
    return this.bot;
  }

  private registriereEvents(): void {
    this.bot.on('login', () => {
      console.log(`[Status] Bot ${this.bot.username} hat sich erfolgreich eingeloggt.`);
      if (this.botState === 'INITIAL') {
        this.botState = 'SWITCHING';
        setTimeout(() => {
          console.log('[Befehl] Wechsle zu CB21...');
          this.bot.chat('/switch CB21');
        }, 2000);
      }
    });

    this.bot.on('spawn', () => {
      console.log(`[Status] Bot ist auf dem Server gespawnt.`);
    });

    this.bot.on('message', (jsonMsg) => {
      const message = jsonMsg.toString();
      if (message.includes('GrieferGames') || message.includes(this.bot.username)) {
        console.log(`[System-Chat] ${message}`);
      }

      if (message.includes('GGAuth')) {
        const verifyCommand = message.match(/\/verify \w+/);
        if (verifyCommand) {
          console.log(
            `[Status] Führe GGAuth-Verifizierung aus: ${verifyCommand[0]}`,
          );
          this.bot.chat(verifyCommand[0]);
        }
      }

      if (
        this.botState === 'SWITCHING' &&
        message.includes('Du wurdest automatisch auf cb21 verbunden.')
      ) {
        this.botState = 'TELEPORTING';
        setTimeout(() => {
          console.log('[Befehl] Teleportiere zum Plot-Home...');
          this.bot.chat('/p h');
        }, 3000);
      }

      if (
        this.botState === 'TELEPORTING' &&
        message.includes('Du wurdest zum Grundstück teleportiert.')
      ) {
        console.log('[Status] Bot ist auf dem Plot angekommen und bereit.');
        this.botState = 'READY';
      }
    });

    this.bot.on('kicked', (reason) => {
      console.log(`[Status] Bot wurde gekickt: ${reason}`);
      this.botState = 'INITIAL';
    });

    this.bot.on('error', (err) => {
      console.error(`[Fehler] Ein Fehler ist aufgetreten:`, err);
    });

    this.bot.on('end', (reason) => {
      console.log(`[Status] Verbindung beendet: ${reason}`);
      this.botState = 'INITIAL';
    });
  }
}
