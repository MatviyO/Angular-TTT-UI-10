import { Injectable } from '@angular/core';

@Injectable()
export class ListenerService {
    private listeners: ((T) => void)[] = [];

    addListeners(callback: (T) => void): void {
        this.listeners.push(callback);
    }

    notify(data: any) {
        this.listeners.forEach(l => l(data));
    }
}
