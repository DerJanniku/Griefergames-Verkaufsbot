"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datenbank = void 0;
const mongodb_1 = require("mongodb");
class Datenbank {
    client;
    db;
    constructor() {
        if (process.env.DB_ENABLED !== 'true') {
            console.log('[Datenbank] Datenbank ist deaktiviert.');
            return;
        }
        const uri = process.env.DB_URI;
        if (!uri) {
            console.error('[Fehler] DB_URI ist nicht in der .env-Datei gesetzt.');
            process.exit(1);
        }
        this.client = new mongodb_1.MongoClient(uri);
    }
    async verbinden() {
        if (!this.client)
            return;
        try {
            await this.client.connect();
            this.db = this.client.db();
            console.log('[Datenbank] Erfolgreich mit der MongoDB verbunden.');
        }
        catch (error) {
            console.error('[Fehler] Fehler beim Verbinden mit der MongoDB:', error);
            process.exit(1);
        }
    }
    getDb() {
        return this.db;
    }
    async trennen() {
        if (this.client) {
            await this.client.close();
            console.log('[Datenbank] Verbindung zur MongoDB getrennt.');
        }
    }
}
exports.Datenbank = Datenbank;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZW5iYW5rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvRGF0ZW5iYW5rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUEwQztBQUUxQyxNQUFhLFNBQVM7SUFDWixNQUFNLENBQTBCO0lBQ2hDLEVBQUUsQ0FBaUI7SUFFM0I7UUFDRSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUN0RCxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUkscUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUN6QixJQUFJLENBQUM7WUFDSCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFDOUQsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXpDRCw4QkF5Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25nb0NsaWVudCwgRGIgfSBmcm9tICdtb25nb2RiJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlbmJhbmsge1xyXG4gIHByaXZhdGUgY2xpZW50OiBNb25nb0NsaWVudCB8IHVuZGVmaW5lZDtcclxuICBwcml2YXRlIGRiOiBEYiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuREJfRU5BQkxFRCAhPT0gJ3RydWUnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbRGF0ZW5iYW5rXSBEYXRlbmJhbmsgaXN0IGRlYWt0aXZpZXJ0LicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuREJfVVJJO1xyXG4gICAgaWYgKCF1cmkpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignW0ZlaGxlcl0gREJfVVJJIGlzdCBuaWNodCBpbiBkZXIgLmVudi1EYXRlaSBnZXNldHp0LicpO1xyXG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyB2ZXJiaW5kZW4oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoIXRoaXMuY2xpZW50KSByZXR1cm47XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLmNsaWVudC5jb25uZWN0KCk7XHJcbiAgICAgIHRoaXMuZGIgPSB0aGlzLmNsaWVudC5kYigpO1xyXG4gICAgICBjb25zb2xlLmxvZygnW0RhdGVuYmFua10gRXJmb2xncmVpY2ggbWl0IGRlciBNb25nb0RCIHZlcmJ1bmRlbi4nKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tGZWhsZXJdIEZlaGxlciBiZWltIFZlcmJpbmRlbiBtaXQgZGVyIE1vbmdvREI6JywgZXJyb3IpO1xyXG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGIoKTogRGIgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuZGI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgdHJlbm5lbigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICh0aGlzLmNsaWVudCkge1xyXG4gICAgICBhd2FpdCB0aGlzLmNsaWVudC5jbG9zZSgpO1xyXG4gICAgICBjb25zb2xlLmxvZygnW0RhdGVuYmFua10gVmVyYmluZHVuZyB6dXIgTW9uZ29EQiBnZXRyZW5udC4nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19