import { Reminder } from 'src/app/core/model/reminder';

export interface IReminderService {
    loadData(): Promise<Reminder[]>;
    subscribe(callback: (message: string) => void): IReminderObj;
    unsubscribe(key: number): void;
    notify(data: Reminder[]): void;
    dismiss(reminder: Reminder): Promise<Reminder>;
    create(reminder: Reminder): Promise<Reminder>;
}

export interface IReminderObj {
    data: Reminder[];
    key: number;
}

