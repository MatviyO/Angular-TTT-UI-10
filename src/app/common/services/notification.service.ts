import { Injectable } from '@angular/core';
import { INotificationService, Severity } from '../interfaces';

@Injectable()
export class NotificationService implements INotificationService {

    private listeners: ((priority: Severity, title: string, message: string) => void)[] = [];

    subscribe(callback: (priority: Severity, title: string, message: string) => void): void {
        this.listeners.push(callback);
    }

    notify(priority: Severity, title: string, message: string): void {
        this.listeners.forEach(f => f(priority, title, message));
    }

    info(title: string, message: string): void {
        this.notify(Severity.info, title, message);
    }
    warning(title: string, message: string): void {
        this.notify(Severity.warning, title, message);
    }
    error(title: string, message: string): void {
        this.notify(Severity.error, title, message);
    }
}
