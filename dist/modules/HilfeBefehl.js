"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.befehl = void 0;
exports.befehl = {
    name: 'hilfe',
    description: 'Zeigt eine Liste aller verfügbaren Befehle an.',
    aliases: ['help', 'commands'],
    permissions: ['user'],
    cooldown: 5,
    execute: (bot, username, _args) => {
        // Diese Logik wird später implementiert, um Befehle dynamisch aufzulisten.
        bot.chat(`/msg ${username} Verfügbare Befehle: !hilfe, !switch`);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlsZmVCZWZlaGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kdWxlcy9IaWxmZUJlZmVobC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHYSxRQUFBLE1BQU0sR0FBWTtJQUM3QixJQUFJLEVBQUUsT0FBTztJQUNiLFdBQVcsRUFBRSxnREFBZ0Q7SUFDN0QsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztJQUM3QixXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckIsUUFBUSxFQUFFLENBQUM7SUFDWCxPQUFPLEVBQUUsQ0FBQyxHQUFRLEVBQUUsUUFBZ0IsRUFBRSxLQUFlLEVBQUUsRUFBRTtRQUN2RCwyRUFBMkU7UUFDM0UsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLFFBQVEsc0NBQXNDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvdCB9IGZyb20gJ21pbmVmbGF5ZXInO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnLi4vY29yZS9Db21tYW5kJztcclxuXHJcbmV4cG9ydCBjb25zdCBiZWZlaGw6IENvbW1hbmQgPSB7XHJcbiAgbmFtZTogJ2hpbGZlJyxcclxuICBkZXNjcmlwdGlvbjogJ1plaWd0IGVpbmUgTGlzdGUgYWxsZXIgdmVyZsO8Z2JhcmVuIEJlZmVobGUgYW4uJyxcclxuICBhbGlhc2VzOiBbJ2hlbHAnLCAnY29tbWFuZHMnXSxcclxuICBwZXJtaXNzaW9uczogWyd1c2VyJ10sXHJcbiAgY29vbGRvd246IDUsXHJcbiAgZXhlY3V0ZTogKGJvdDogQm90LCB1c2VybmFtZTogc3RyaW5nLCBfYXJnczogc3RyaW5nW10pID0+IHtcclxuICAgIC8vIERpZXNlIExvZ2lrIHdpcmQgc3DDpHRlciBpbXBsZW1lbnRpZXJ0LCB1bSBCZWZlaGxlIGR5bmFtaXNjaCBhdWZ6dWxpc3Rlbi5cclxuICAgIGJvdC5jaGF0KGAvbXNnICR7dXNlcm5hbWV9IFZlcmbDvGdiYXJlIEJlZmVobGU6ICFoaWxmZSwgIXN3aXRjaGApO1xyXG4gIH0sXHJcbn07XHJcbiJdfQ==