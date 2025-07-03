import { MongoClient, Db } from 'mongodb';

export class Datenbank {
  private client: MongoClient | undefined;
  private db: Db | undefined;

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

    this.client = new MongoClient(uri);
  }

  public async verbinden(): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.connect();
      this.db = this.client.db();
      console.log('[Datenbank] Erfolgreich mit der MongoDB verbunden.');
    } catch (error) {
      console.error('[Fehler] Fehler beim Verbinden mit der MongoDB:', error);
      process.exit(1);
    }
  }

  public getDb(): Db | undefined {
    return this.db;
  }

  public async trennen(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('[Datenbank] Verbindung zur MongoDB getrennt.');
    }
  }
}
