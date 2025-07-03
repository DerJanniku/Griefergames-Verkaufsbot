import { VerkaufsBot } from './Bot';
export declare class PluginHandler {
    private bot;
    private readonly geladenePlugins;
    constructor(bot: VerkaufsBot);
    ladePlugins(): void;
    entladePlugin(pluginName: string): void;
}
