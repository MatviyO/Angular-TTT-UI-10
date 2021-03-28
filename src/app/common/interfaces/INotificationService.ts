import { Reminder } from 'src/app/core/model/reminder';

export interface INotificationService {
    subscribe(callback: (priority: Severity, title: string, message: string, reminder?: Reminder) => void): void;
    subscribeReminder(callback: (reminder: Reminder) => void): void;
    subscribeReminders(callback: (reminders: Reminder[]) => void): void;
    dismiss(reminder: Reminder): void;
    notifyReminder(reminders: Reminder[]): void;
    notify(priority: Severity, title: string, message: string, reminder?: Reminder): void;
    info(title: string, message: string): void;
    warning(title: string, message: string): void;
    error(title: string, message: string): void;
}

export enum Severity {
    info = 0,
    warning,
    error,
}
