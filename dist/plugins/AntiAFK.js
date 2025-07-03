"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
let antiAfkInterval = null;
exports.plugin = {
    name: 'AntiAFK',
    description: 'Verhindert, dass der Bot wegen Inaktivität gekickt wird.',
    laden(botInstance) {
        const bot = botInstance.getBot();
        antiAfkInterval = setInterval(() => {
            bot.swingArm('right');
        }, 30 * 1000);
        console.log('[Plugin] AntiAFK-Plugin geladen und aktiviert.');
    },
    entladen() {
        if (antiAfkInterval) {
            clearInterval(antiAfkInterval);
            antiAfkInterval = null;
            console.log('[Plugin] AntiAFK-Plugin entladen und deaktiviert.');
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW50aUFGSy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW5zL0FudGlBRksudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsSUFBSSxlQUFlLEdBQTBCLElBQUksQ0FBQztBQUVyQyxRQUFBLE1BQU0sR0FBVztJQUM1QixJQUFJLEVBQUUsU0FBUztJQUNmLFdBQVcsRUFBRSwwREFBMEQ7SUFDdkUsS0FBSyxDQUFDLFdBQXdCO1FBQzVCLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxlQUFlLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNqQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQ3BCLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvQixlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUNuRSxDQUFDO0lBQ0gsQ0FBQztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuLi9jb3JlL1BsdWdpbic7XHJcbmltcG9ydCB7IFZlcmthdWZzQm90IH0gZnJvbSAnLi4vY29yZS9Cb3QnO1xyXG5cclxubGV0IGFudGlBZmtJbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCBudWxsID0gbnVsbDtcclxuXHJcbmV4cG9ydCBjb25zdCBwbHVnaW46IFBsdWdpbiA9IHtcclxuICBuYW1lOiAnQW50aUFGSycsXHJcbiAgZGVzY3JpcHRpb246ICdWZXJoaW5kZXJ0LCBkYXNzIGRlciBCb3Qgd2VnZW4gSW5ha3Rpdml0w6R0IGdla2lja3Qgd2lyZC4nLFxyXG4gIGxhZGVuKGJvdEluc3RhbmNlOiBWZXJrYXVmc0JvdCk6IHZvaWQge1xyXG4gICAgY29uc3QgYm90ID0gYm90SW5zdGFuY2UuZ2V0Qm90KCk7XHJcbiAgICBhbnRpQWZrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGJvdC5zd2luZ0FybSgncmlnaHQnKTtcclxuICAgIH0sIDMwICogMTAwMCk7XHJcbiAgICBjb25zb2xlLmxvZygnW1BsdWdpbl0gQW50aUFGSy1QbHVnaW4gZ2VsYWRlbiB1bmQgYWt0aXZpZXJ0LicpO1xyXG4gIH0sXHJcbiAgZW50bGFkZW4oKTogdm9pZCB7XHJcbiAgICBpZiAoYW50aUFma0ludGVydmFsKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwoYW50aUFma0ludGVydmFsKTtcclxuICAgICAgYW50aUFma0ludGVydmFsID0gbnVsbDtcclxuICAgICAgY29uc29sZS5sb2coJ1tQbHVnaW5dIEFudGlBRkstUGx1Z2luIGVudGxhZGVuIHVuZCBkZWFrdGl2aWVydC4nKTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG4iXX0=