"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class CommandHandler {
    bot;
    commands = new Map();
    cooldowns = new Map();
    prefix = process.env.BOT_PREFIX || '!';
    admins;
    constructor(bot) {
        this.bot = bot;
        this.admins = (process.env.ADMIN_USERS || '')
            .split(',')
            .map((name) => name.trim().toLowerCase());
        this.ladeBefehle();
        this.registriereChatEvent();
    }
    ladeBefehle() {
        const befehlsPfad = path.join(__dirname, '../modules');
        if (!fs.existsSync(befehlsPfad)) {
            console.warn(`[Warnung] Befehlsverzeichnis nicht gefunden: ${befehlsPfad}`);
            return;
        }
        const dateien = fs.readdirSync(befehlsPfad);
        const geladeneBefehle = new Set();
        for (const datei of dateien) {
            if (datei.endsWith('.js')) {
                try {
                    const modul = require(path.join(befehlsPfad, datei));
                    const befehl = modul.befehl;
                    if (befehl && befehl.name && typeof befehl.execute === 'function') {
                        this.commands.set(befehl.name, befehl);
                        geladeneBefehle.add(befehl);
                        if (befehl.aliases && Array.isArray(befehl.aliases)) {
                            befehl.aliases.forEach((alias) => {
                                this.commands.set(alias, befehl);
                            });
                        }
                    }
                }
                catch (error) {
                    console.error(`[Fehler] Fehler beim Laden des Befehls aus ${datei}:`, error);
                }
            }
        }
        console.log(`[Status] ${geladeneBefehle.size} Befehle erfolgreich geladen.`);
    }
    registriereChatEvent() {
        this.bot.on('chat', (username, message) => {
            if (username === this.bot.username || !message.startsWith(this.prefix)) {
                return;
            }
            const args = message.slice(this.prefix.length).trim().split(/ +/);
            const commandName = args.shift()?.toLowerCase();
            if (!commandName)
                return;
            const command = this.commands.get(commandName);
            if (command) {
                const hatBerechtigung = this.hatBerechtigung(username, command.permissions);
                if (!hatBerechtigung) {
                    this.bot.chat(`/msg ${username} Du hast keine Berechtigung, diesen Befehl auszuführen.`);
                    return;
                }
                if (!this.cooldowns.has(command.name)) {
                    this.cooldowns.set(command.name, new Map());
                }
                const timestamps = this.cooldowns.get(command.name);
                const cooldownDauer = (command.cooldown || 3) * 1000;
                const jetzt = Date.now();
                if (timestamps.has(username)) {
                    const ablaufzeit = timestamps.get(username) + cooldownDauer;
                    if (jetzt < ablaufzeit) {
                        const verbleibendeZeit = (ablaufzeit - jetzt) / 1000;
                        this.bot.chat(`/msg ${username} Bitte warte noch ${verbleibendeZeit.toFixed(1)} Sekunden, bevor du den Befehl '${command.name}' erneut verwendest.`);
                        return;
                    }
                }
                timestamps.set(username, jetzt);
                setTimeout(() => timestamps.delete(username), cooldownDauer);
                try {
                    command.execute(this.bot, username, args);
                }
                catch (error) {
                    console.error(`[Fehler] Fehler beim Ausführen des Befehls ${commandName}:`, error);
                    this.bot.chat(`/msg ${username} Bei der Ausführung des Befehls ist ein Fehler aufgetreten.`);
                }
            }
        });
    }
    hatBerechtigung(username, requiredPermissions) {
        if (requiredPermissions.includes('user')) {
            return true;
        }
        if (requiredPermissions.includes('admin')) {
            return this.admins.includes(username.toLowerCase());
        }
        return false;
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9Db21tYW5kSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBRTdCLE1BQWEsY0FBYztJQU1MO0lBTEgsUUFBUSxHQUF5QixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzNDLFNBQVMsR0FBcUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUN4RCxNQUFNLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDO0lBQy9DLE1BQU0sQ0FBVztJQUVsQyxZQUFvQixHQUFRO1FBQVIsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO2FBQzFDLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU8sV0FBVztRQUNqQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0RBQWdELFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDNUUsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFdB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LENBQ04sQ0FBQztvQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FDWCxRQUFRLFFBQVEsNkRBQTZELENBQzlFLENBQUM7Z0JBQ0osQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxlQUFlLENBQUMsUUFBZ0IsRUFBRSxtQkFBeUM7UUFDakYsSUFBSSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUN6QyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBMUhELHdDQTBIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvdCB9IGZyb20gJ21pbmVmbGF5ZXInO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnLi9Db21tYW5kJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1hbmRIYW5kbGVyIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNvbW1hbmRzOiBNYXA8c3RyaW5nLCBDb21tYW5kPiA9IG5ldyBNYXAoKTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNvb2xkb3duczogTWFwPHN0cmluZywgTWFwPHN0cmluZywgbnVtYmVyPj4gPSBuZXcgTWFwKCk7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBwcmVmaXg6IHN0cmluZyA9IHByb2Nlc3MuZW52LkJPVF9QUkVGSVggfHwgJyEnO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYWRtaW5zOiBzdHJpbmdbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBib3Q6IEJvdCkge1xyXG4gICAgdGhpcy5hZG1pbnMgPSAocHJvY2Vzcy5lbnYuQURNSU5fVVNFUlMgfHwgJycpXHJcbiAgICAgIC5zcGxpdCgnLCcpXHJcbiAgICAgIC5tYXAoKG5hbWUpID0+IG5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgdGhpcy5sYWRlQmVmZWhsZSgpO1xyXG4gICAgdGhpcy5yZWdpc3RyaWVyZUNoYXRFdmVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsYWRlQmVmZWhsZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGJlZmVobHNQZmFkID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL21vZHVsZXMnKTtcclxuXHJcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoYmVmZWhsc1BmYWQpKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgW1dhcm51bmddIEJlZmVobHN2ZXJ6ZWljaG5pcyBuaWNodCBnZWZ1bmRlbjogJHtiZWZlaGxzUGZhZH1gKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGVpZW4gPSBmcy5yZWFkZGlyU3luYyhiZWZlaGxzUGZhZCk7XHJcbiAgICBjb25zdCBnZWxhZGVuZUJlZmVobGUgPSBuZXcgU2V0PENvbW1hbmQ+KCk7XHJcblxyXG4gICAgZm9yIChjb25zdCBkYXRlaSBvZiBkYXRlaWVuKSB7XHJcbiAgICAgIGlmIChkYXRlaS5lbmRzV2l0aCgnLmpzJykpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgbW9kdWwgPSByZXF1aXJlKHBhdGguam9pbihiZWZlaGxzUGZhZCwgZGF0ZWkpKTtcclxuICAgICAgICAgIGNvbnN0IGJlZmVobDogQ29tbWFuZCA9IG1vZHVsLmJlZmVobDtcclxuXHJcbiAgICAgICAgICBpZiAoYmVmZWhsICYmIGJlZmVobC5uYW1lICYmIHR5cGVvZiBiZWZlaGwuZXhlY3V0ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnNldChiZWZlaGwubmFtZSwgYmVmZWhsKTtcclxuICAgICAgICAgICAgZ2VsYWRlbmVCZWZlaGxlLmFkZChiZWZlaGwpO1xyXG4gICAgICAgICAgICBpZiAoYmVmZWhsLmFsaWFzZXMgJiYgQXJyYXkuaXNBcnJheShiZWZlaGwuYWxpYXNlcykpIHtcclxuICAgICAgICAgICAgICBiZWZlaGwuYWxpYXNlcy5mb3JFYWNoKChhbGlhczogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnNldChhbGlhcywgYmVmZWhsKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBbRmVobGVyXSBGZWhsZXIgYmVpbSBMYWRlbiBkZXMgQmVmZWhscyBhdXMgJHtkYXRlaX06YCwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYFtTdGF0dXNdICR7Z2VsYWRlbmVCZWZlaGxlLnNpemV9IEJlZmVobGUgZXJmb2xncmVpY2ggZ2VsYWRlbi5gKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVnaXN0cmllcmVDaGF0RXZlbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmJvdC5vbignY2hhdCcsICh1c2VybmFtZSwgbWVzc2FnZSkgPT4ge1xyXG4gICAgICBpZiAodXNlcm5hbWUgPT09IHRoaXMuYm90LnVzZXJuYW1lIHx8ICFtZXNzYWdlLnN0YXJ0c1dpdGgodGhpcy5wcmVmaXgpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhcmdzID0gbWVzc2FnZS5zbGljZSh0aGlzLnByZWZpeC5sZW5ndGgpLnRyaW0oKS5zcGxpdCgvICsvKTtcclxuICAgICAgY29uc3QgY29tbWFuZE5hbWUgPSBhcmdzLnNoaWZ0KCk/LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICBpZiAoIWNvbW1hbmROYW1lKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5jb21tYW5kcy5nZXQoY29tbWFuZE5hbWUpO1xyXG4gICAgICBpZiAoY29tbWFuZCkge1xyXG4gICAgICAgIGNvbnN0IGhhdEJlcmVjaHRpZ3VuZyA9IHRoaXMuaGF0QmVyZWNodGlndW5nKFxyXG4gICAgICAgICAgdXNlcm5hbWUsXHJcbiAgICAgICAgICBjb21tYW5kLnBlcm1pc3Npb25zLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKCFoYXRCZXJlY2h0aWd1bmcpIHtcclxuICAgICAgICAgIHRoaXMuYm90LmNoYXQoXHJcbiAgICAgICAgICAgIGAvbXNnICR7dXNlcm5hbWV9IER1IGhhc3Qga2VpbmUgQmVyZWNodGlndW5nLCBkaWVzZW4gQmVmZWhsIGF1c3p1ZsO8aHJlbi5gLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jb29sZG93bnMuaGFzKGNvbW1hbmQubmFtZSkpIHtcclxuICAgICAgICAgIHRoaXMuY29vbGRvd25zLnNldChjb21tYW5kLm5hbWUsIG5ldyBNYXAoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0aW1lc3RhbXBzID0gdGhpcy5jb29sZG93bnMuZ2V0KGNvbW1hbmQubmFtZSkhO1xyXG4gICAgICAgIGNvbnN0IGNvb2xkb3duRGF1ZXIgPSAoY29tbWFuZC5jb29sZG93biB8fCAzKSAqIDEwMDA7XHJcbiAgICAgICAgY29uc3QgamV0enQgPSBEYXRlLm5vdygpO1xyXG5cclxuICAgICAgICBpZiAodGltZXN0YW1wcy5oYXModXNlcm5hbWUpKSB7XHJcbiAgICAgICAgICBjb25zdCBhYmxhdWZ6ZWl0ID0gdGltZXN0YW1wcy5nZXQodXNlcm5hbWUpISArIGNvb2xkb3duRGF1ZXI7XHJcbiAgICAgICAgICBpZiAoamV0enQgPCBhYmxhdWZ6ZWl0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZlcmJsZWliZW5kZVplaXQgPSAoYWJsYXVmemVpdCAtIGpldHp0KSAvIDEwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuYm90LmNoYXQoXHJcbiAgICAgICAgICAgICAgYC9tc2cgJHt1c2VybmFtZX0gQml0dGUgd2FydGUgbm9jaCAke3ZlcmJsZWliZW5kZVplaXQudG9GaXhlZChcclxuICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgKX0gU2VrdW5kZW4sIGJldm9yIGR1IGRlbiBCZWZlaGwgJyR7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kLm5hbWVcclxuICAgICAgICAgICAgICB9JyBlcm5ldXQgdmVyd2VuZGVzdC5gLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lc3RhbXBzLnNldCh1c2VybmFtZSwgamV0enQpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGltZXN0YW1wcy5kZWxldGUodXNlcm5hbWUpLCBjb29sZG93bkRhdWVyKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbW1hbmQuZXhlY3V0ZSh0aGlzLmJvdCwgdXNlcm5hbWUsIGFyZ3MpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgICBgW0ZlaGxlcl0gRmVobGVyIGJlaW0gQXVzZsO8aHJlbiBkZXMgQmVmZWhscyAke2NvbW1hbmROYW1lfTpgLFxyXG4gICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmJvdC5jaGF0KFxyXG4gICAgICAgICAgICBgL21zZyAke3VzZXJuYW1lfSBCZWkgZGVyIEF1c2bDvGhydW5nIGRlcyBCZWZlaGxzIGlzdCBlaW4gRmVobGVyIGF1ZmdldHJldGVuLmAsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhdEJlcmVjaHRpZ3VuZyh1c2VybmFtZTogc3RyaW5nLCByZXF1aXJlZFBlcm1pc3Npb25zOiAoJ2FkbWluJyB8ICd1c2VyJylbXSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHJlcXVpcmVkUGVybWlzc2lvbnMuaW5jbHVkZXMoJ3VzZXInKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChyZXF1aXJlZFBlcm1pc3Npb25zLmluY2x1ZGVzKCdhZG1pbicpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFkbWlucy5pbmNsdWRlcyh1c2VybmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19