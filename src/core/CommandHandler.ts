import { Bot } from 'mineflayer';
import { Command } from './Command';
import * as fs from 'fs';
import * as path from 'path';

export class CommandHandler {
  private readonly commands: Map<string, Command> = new Map();
  private readonly cooldowns: Map<string, Map<string, number>> = new Map();
  private readonly prefix: string = process.env.BOT_PREFIX || '!';
  private readonly admins: string[];

  constructor(private bot: Bot) {
    this.admins = (process.env.ADMIN_USERS || '')
      .split(',')
      .map((name) => name.trim().toLowerCase());
    this.ladeBefehle();
    this.registriereChatEvent();
  }

  private ladeBefehle(): void {
    const befehlsPfad = path.join(__dirname, '../modules');

    if (!fs.existsSync(befehlsPfad)) {
      console.warn(`[Warnung] Befehlsverzeichnis nicht gefunden: ${befehlsPfad}`);
      return;
    }

    const dateien = fs.readdirSync(befehlsPfad);
    const geladeneBefehle = new Set<Command>();

    for (const datei of dateien) {
      if (datei.endsWith('.js')) {
        try {
          const modul = require(path.join(befehlsPfad, datei));
          const befehl: Command = modul.befehl;

          if (befehl && befehl.name && typeof befehl.execute === 'function') {
            this.commands.set(befehl.name, befehl);
            geladeneBefehle.add(befehl);
            if (befehl.aliases && Array.isArray(befehl.aliases)) {
              befehl.aliases.forEach((alias: string) => {
                this.commands.set(alias, befehl);
              });
            }
          }
        } catch (error) {
          console.error(`[Fehler] Fehler beim Laden des Befehls aus ${datei}:`, error);
        }
      }
    }
    console.log(`[Status] ${geladeneBefehle.size} Befehle erfolgreich geladen.`);
  }

  private registriereChatEvent(): void {
    this.bot.on('chat', (username, message) => {
      if (username === this.bot.username || !message.startsWith(this.prefix)) {
        return;
      }

      const args = message.slice(this.prefix.length).trim().split(/ +/);
      const commandName = args.shift()?.toLowerCase();

      if (!commandName) return;

      const command = this.commands.get(commandName);
      if (command) {
        const hatBerechtigung = this.hatBerechtigung(
          username,
          command.permissions,
        );
        if (!hatBerechtigung) {
          this.bot.chat(
            `/msg ${username} Du hast keine Berechtigung, diesen Befehl auszuführen.`,
          );
          return;
        }

        if (!this.cooldowns.has(command.name)) {
          this.cooldowns.set(command.name, new Map());
        }

        const timestamps = this.cooldowns.get(command.name)!;
        const cooldownDauer = (command.cooldown || 3) * 1000;
        const jetzt = Date.now();

        if (timestamps.has(username)) {
          const ablaufzeit = timestamps.get(username)! + cooldownDauer;
          if (jetzt < ablaufzeit) {
            const verbleibendeZeit = (ablaufzeit - jetzt) / 1000;
            this.bot.chat(
              `/msg ${username} Bitte warte noch ${verbleibendeZeit.toFixed(
                1,
              )} Sekunden, bevor du den Befehl '${
                command.name
              }' erneut verwendest.`,
            );
            return;
          }
        }

        timestamps.set(username, jetzt);
        setTimeout(() => timestamps.delete(username), cooldownDauer);

        try {
          command.execute(this.bot, username, args);
        } catch (error) {
          console.error(
            `[Fehler] Fehler beim Ausführen des Befehls ${commandName}:`,
            error,
          );
          this.bot.chat(
            `/msg ${username} Bei der Ausführung des Befehls ist ein Fehler aufgetreten.`,
          );
        }
      }
    });
  }

  private hatBerechtigung(username: string, requiredPermissions: ('admin' | 'user')[]): boolean {
    if (requiredPermissions.includes('user')) {
      return true;
    }
    if (requiredPermissions.includes('admin')) {
      return this.admins.includes(username.toLowerCase());
    }
    return false;
  }
}
