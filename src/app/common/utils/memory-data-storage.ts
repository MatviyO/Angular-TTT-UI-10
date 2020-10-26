import { Injectable } from '@angular/core';

import { IDataStorage } from '../interfaces';

@Injectable()
export class MemoryDataStorage implements IDataStorage {

    private data: any = {};

    store(key: string, data: any): void {
        this.data[key] = data;
    }
    exists(key: string): boolean {
        return this.data[key] ? true : false;
    }
    get(key: string): any {
        return this.data[key];
    }
    remove(key: string): void {
        this.data[key] = null;
    }
}
