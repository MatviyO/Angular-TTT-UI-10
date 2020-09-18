export interface IDataStorage {
    store(key: string, data: any): void;
    get(key: string): any;
    exists(key: string): boolean;
    remove(key: string): void;
}
