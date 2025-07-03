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
exports.PluginHandler = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class PluginHandler {
    bot;
    geladenePlugins = new Map();
    constructor(bot) {
        this.bot = bot;
        this.ladePlugins();
    }
    ladePlugins() {
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
                    const plugin = modul.plugin;
                    if (plugin && plugin.name && typeof plugin.laden === 'function') {
                        this.geladenePlugins.set(plugin.name, plugin);
                        plugin.laden(this.bot);
                        console.log(`[Status] Plugin '${plugin.name}' erfolgreich geladen.`);
                    }
                }
                catch (error) {
                    console.error(`[Fehler] Fehler beim Laden des Plugins aus ${datei}:`, error);
                }
            }
        }
    }
    entladePlugin(pluginName) {
        const plugin = this.geladenePlugins.get(pluginName);
        if (plugin && typeof plugin.entladen === 'function') {
            plugin.entladen(this.bot);
            this.geladenePlugins.delete(pluginName);
            console.log(`[Status] Plugin '${pluginName}' erfolgreich entladen.`);
        }
    }
}
exports.PluginHandler = PluginHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1Z2luSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL1BsdWdpbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUU3QixNQUFhLGFBQWE7SUFHSjtJQUZILGVBQWUsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVsRSxZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sV0FBVztRQUNoQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUNuRSxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0MsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxDQUFDO29CQUNILE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxNQUFNLE1BQU0sR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUVwQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUUsQ0FBQzt3QkFDaEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLE1BQU0sQ0FBQyxJQUFJLHdCQUF3QixDQUFDLENBQUM7b0JBQ3ZFLENBQUM7Z0JBQ0gsQ0FBQztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsOENBQThDLEtBQUssR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMvRSxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRU0sYUFBYSxDQUFDLFVBQWtCO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUNwRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixVQUFVLHlCQUF5QixDQUFDLENBQUM7UUFDdkUsQ0FBQztJQUNILENBQUM7Q0FDRjtBQTVDRCxzQ0E0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZXJrYXVmc0JvdCB9IGZyb20gJy4vQm90JztcclxuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9QbHVnaW4nO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGx1Z2luSGFuZGxlciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBnZWxhZGVuZVBsdWdpbnM6IE1hcDxzdHJpbmcsIFBsdWdpbj4gPSBuZXcgTWFwKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYm90OiBWZXJrYXVmc0JvdCkge1xyXG4gICAgdGhpcy5sYWRlUGx1Z2lucygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxhZGVQbHVnaW5zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcGx1Z2luUGZhZCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9wbHVnaW5zJyk7XHJcblxyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHBsdWdpblBmYWQpKSB7XHJcbiAgICAgIGZzLm1rZGlyU3luYyhwbHVnaW5QZmFkKTtcclxuICAgICAgY29uc29sZS5sb2coYFtTdGF0dXNdIFBsdWdpbi1WZXJ6ZWljaG5pcyBlcnN0ZWxsdDogJHtwbHVnaW5QZmFkfWApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0ZWllbiA9IGZzLnJlYWRkaXJTeW5jKHBsdWdpblBmYWQpO1xyXG5cclxuICAgIGZvciAoY29uc3QgZGF0ZWkgb2YgZGF0ZWllbikge1xyXG4gICAgICBpZiAoZGF0ZWkuZW5kc1dpdGgoJy5qcycpKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IG1vZHVsID0gcmVxdWlyZShwYXRoLmpvaW4ocGx1Z2luUGZhZCwgZGF0ZWkpKTtcclxuICAgICAgICAgIGNvbnN0IHBsdWdpbjogUGx1Z2luID0gbW9kdWwucGx1Z2luO1xyXG5cclxuICAgICAgICAgIGlmIChwbHVnaW4gJiYgcGx1Z2luLm5hbWUgJiYgdHlwZW9mIHBsdWdpbi5sYWRlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmdlbGFkZW5lUGx1Z2lucy5zZXQocGx1Z2luLm5hbWUsIHBsdWdpbik7XHJcbiAgICAgICAgICAgIHBsdWdpbi5sYWRlbih0aGlzLmJvdCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbU3RhdHVzXSBQbHVnaW4gJyR7cGx1Z2luLm5hbWV9JyBlcmZvbGdyZWljaCBnZWxhZGVuLmApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBbRmVobGVyXSBGZWhsZXIgYmVpbSBMYWRlbiBkZXMgUGx1Z2lucyBhdXMgJHtkYXRlaX06YCwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGVudGxhZGVQbHVnaW4ocGx1Z2luTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBwbHVnaW4gPSB0aGlzLmdlbGFkZW5lUGx1Z2lucy5nZXQocGx1Z2luTmFtZSk7XHJcbiAgICBpZiAocGx1Z2luICYmIHR5cGVvZiBwbHVnaW4uZW50bGFkZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcGx1Z2luLmVudGxhZGVuKHRoaXMuYm90KTtcclxuICAgICAgdGhpcy5nZWxhZGVuZVBsdWdpbnMuZGVsZXRlKHBsdWdpbk5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgW1N0YXR1c10gUGx1Z2luICcke3BsdWdpbk5hbWV9JyBlcmZvbGdyZWljaCBlbnRsYWRlbi5gKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19