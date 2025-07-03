"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.befehl = void 0;
exports.befehl = {
    name: 'switch',
    description: 'Wechselt zu einem angegebenen CityBuild.',
    aliases: ['cb'],
    permissions: ['admin'],
    cooldown: 10,
    execute: (bot, username, args) => {
        if (args.length === 0) {
            bot.chat(`/msg ${username} Bitte gib einen CityBuild an. Beispiel: !switch cb10`);
            return;
        }
        const cityBuild = args[0];
        bot.chat(`/switch ${cityBuild}`);
        bot.chat(`/msg ${username} Wechsle zu ${cityBuild}...`);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoQmVmZWhsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvU3dpdGNoQmVmZWhsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdhLFFBQUEsTUFBTSxHQUFZO0lBQzdCLElBQUksRUFBRSxRQUFRO0lBQ2QsV0FBVyxFQUFFLDBDQUEwQztJQUN2RCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDZixXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDdEIsUUFBUSxFQUFFLEVBQUU7SUFDWixPQUFPLEVBQUUsQ0FBQyxHQUFRLEVBQUUsUUFBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtRQUN0RCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLFFBQVEsdURBQXVELENBQUMsQ0FBQztZQUNsRixPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsUUFBUSxlQUFlLFNBQVMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3QgfSBmcm9tICdtaW5lZmxheWVyJztcclxuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJy4uL2NvcmUvQ29tbWFuZCc7XHJcblxyXG5leHBvcnQgY29uc3QgYmVmZWhsOiBDb21tYW5kID0ge1xyXG4gIG5hbWU6ICdzd2l0Y2gnLFxyXG4gIGRlc2NyaXB0aW9uOiAnV2VjaHNlbHQgenUgZWluZW0gYW5nZWdlYmVuZW4gQ2l0eUJ1aWxkLicsXHJcbiAgYWxpYXNlczogWydjYiddLFxyXG4gIHBlcm1pc3Npb25zOiBbJ2FkbWluJ10sXHJcbiAgY29vbGRvd246IDEwLFxyXG4gIGV4ZWN1dGU6IChib3Q6IEJvdCwgdXNlcm5hbWU6IHN0cmluZywgYXJnczogc3RyaW5nW10pID0+IHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBib3QuY2hhdChgL21zZyAke3VzZXJuYW1lfSBCaXR0ZSBnaWIgZWluZW4gQ2l0eUJ1aWxkIGFuLiBCZWlzcGllbDogIXN3aXRjaCBjYjEwYCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGNpdHlCdWlsZCA9IGFyZ3NbMF07XHJcbiAgICBib3QuY2hhdChgL3N3aXRjaCAke2NpdHlCdWlsZH1gKTtcclxuICAgIGJvdC5jaGF0KGAvbXNnICR7dXNlcm5hbWV9IFdlY2hzbGUgenUgJHtjaXR5QnVpbGR9Li4uYCk7XHJcbiAgfSxcclxufTtcclxuIl19