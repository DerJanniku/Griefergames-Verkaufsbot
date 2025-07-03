import { VerkaufsBot } from './Bot';
import { Plugin } from './Plugin';
import * as fs from 'fs';
import * as path from 'path';

export class PluginHandler {
  private readonly geladenePlugins: Map<string, Plugin> = new Map();

  constructor(private bot: VerkaufsBot) {
    this.ladePlugins();
  }

  public ladePlugins(): void {
    const pluginPfad = path.join(__dirname, '../plugins');

    if (!fs.existsSync(pluginPfad)) {
      fs.mkdirSync(pluginPfad);
      console.log(`[Status] Plugin-Verzeichnis erstellt: ${pluginPfad}`);
      return;
    }

    const dateien = fs.readdirSync(pluginPfad);

    for (const datei of dateien) {
      if (datei.endsWith('.js')) {
        try {
          const modul = require(path.join(pluginPfad, datei));
          const plugin: Plugin = modul.plugin;

          if (plugin && plugin.name && typeof plugin.laden === 'function') {
            this.geladenePlugins.set(plugin.name, plugin);
            plugin.laden(this.bot);
            console.log(`[Status] Plugin '${plugin.name}' erfolgreich geladen.`);
          }
        } catch (error) {
          console.error(`[Fehler] Fehler beim Laden des Plugins aus ${datei}:`, error);
        }
      }
    }
  }

  public entladePlugin(pluginName: string): void {
    const plugin = this.geladenePlugins.get(pluginName);
    if (plugin && typeof plugin.entladen === 'function') {
      plugin.entladen(this.bot);
      this.geladenePlugins.delete(pluginName);
      console.log(`[Status] Plugin '${pluginName}' erfolgreich entladen.`);
    }
  }
}
