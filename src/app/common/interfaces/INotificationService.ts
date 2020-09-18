export interface INotificationService {

    subscribe(callback: (priority: Severity, title: string, message: string) => void): void;

    notify(priority: Severity, title: string, message: string): void;
    info(title: string, message: string): void;
    warning(title: string, message: string): void;
    error(title: string, message: string): void;
}

export enum Severity {
    info = 0,
    warning,
    error,
}
