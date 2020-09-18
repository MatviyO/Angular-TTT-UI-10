import { Injectable } from '@angular/core';

import { ICache } from '../interfaces';
import { MemoryDataStorage } from './memory-data-storage';

@Injectable()
export class MemoryCache implements ICache {

    private static data: any = {};

    cache(key: string, value: any, expiration: number = 10, dependencies: string[] = []): void {
        if (expiration > 0) {
            MemoryCache.data[key] = { data: value, dependencies };
            setTimeout(() => { MemoryCache.data[key] = null; }, expiration * 60 * 1000);
        }
    }

    get(key: string): any {
        return MemoryCache.data[key].data;
    }

    keyExist(key: string): boolean {
        return MemoryCache.data[key] ? true : false;
    }

    invalidate(key: string): void {
        Object.getOwnPropertyNames(MemoryCache.data).forEach(prop => {
            if (prop.search(`${key}_`) !== -1) {
                MemoryCache.data[prop] = null;
            } else {
                if (MemoryCache.data[prop]) {
                    MemoryCache.data[prop].dependencies.forEach(element => {
                        if (key.search(`${element}`) !== -1) {
                            MemoryCache.data[prop] = null;
                        }
                    });
                }
            }
        });
    }
}
