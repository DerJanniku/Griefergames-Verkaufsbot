import { Db } from 'mongodb';
export declare class Datenbank {
    private client;
    private db;
    constructor();
    verbinden(): Promise<void>;
    getDb(): Db | undefined;
    trennen(): Promise<void>;
}
