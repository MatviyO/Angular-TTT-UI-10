export interface ICache {

    cache(key: string, value: any, expiration?: number, dependencies?: string[]): void;

    get(key: string): any;

    keyExist(key: string): boolean;

    invalidate(key: string): void;
}
