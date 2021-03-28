import { Injectable } from '@angular/core';
import { Reminder } from 'src/app/core/model/reminder';
import { INotificationService, Severity } from '../interfaces';

@Injectable()
export class NotificationService implements INotificationService {
  private listeners: ((priority: Severity, title: string, message: string, reminder?: Reminder) => void)[] = [];
  private reminderDismissListeners: ((reminder: Reminder) => void)[] = [];
  private reminderListeners: ((reminders: Reminder[]) => void)[] = [];

  subscribe(callback: (priority: Severity, title: string, message: string, reminder?: Reminder) => void): void {
    this.listeners.push(callback);
  }

  subscribeReminders(callback: (reminders: Reminder[]) => void): void {
    this.reminderListeners.push(callback);
  }

  subscribeReminder(callback: (reminder: Reminder) => void): void {
    this.reminderDismissListeners.push(callback);
  }

  notify(priority: Severity, title: string, message: string, reminder?: Reminder): void {
    this.listeners.forEach(f => f(priority, title, message, reminder));
  }

  dismiss(reminder: Reminder): void {
    this.reminderDismissListeners.forEach(f => f(reminder));
  }

  notifyReminder(reminders: Reminder[]): void {
    this.reminderListeners.forEach(f => f(reminders));
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
