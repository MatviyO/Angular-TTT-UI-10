import { Injectable, Injector } from '@angular/core';
import { Reminder } from 'src/app/core/model/reminder';
import { IReminderObj, IReminderService } from '../interfaces/IReminderService';
import { BaseDataService } from './data.service';

// get /api/Reminders
// get /api/Reminders/{id}
// get /api/Reminders/active
// put /api/Reminders/dismissAll
// put /api/Reminders/{id}/dismiss
// delete /api/Reminders/{id}
// post /api/Reminders


@Injectable()
export default class ReminderService extends BaseDataService<Reminder> implements IReminderService {
    readonly sec = 1000;
    readonly min = 60 * this.sec;
    readonly hour = this.min * 60;

    private observers = [];
    private data: Reminder[] = [];
    private autoLoad = true;
    private timeCache: number;
    private consoleTimer = null;
    private dataTimer = null;

    constructor(injector: Injector) {
        super(injector, 'api/Reminders');
        this.runService();
    }

    runService = (): void => {
        // this.runConsoleTimer();
        this.setTimeDelay(0, 10)
            .then(() => {
                this.loadData().then(() => setInterval(() => this.data = [], this.timeCache));
            });
    }

    setTimeDelay = (seconds: number, minutes: number = 0, hours: number = 0): Promise<number> => {
        return new Promise((res => {
            let time = 0;
            if (seconds > 0) { time += seconds * this.sec; }
            if (minutes > 0) { time += minutes * this.min; }
            if (hours > 0) { time += hours * this.hour; }
            return res(this.timeCache = time);
        }));
    }

    subscribe(f: (message: string) => void): IReminderObj {
        this.observers.push(f);
        if (this.data.length === 0) { this.loadData(); }
        return { data: this.data, key: this.observers.length };
    }

    unsubscribe = (key: number): void => {
        this.observers.splice(key - 1, 1);
    }

    loadData = (): Promise<Reminder[]> => {
        return new Promise(resolve => {
            if (this.observers && this.observers.length > 0) {
                return this.query('', null, null, null)
                    .then((res: Reminder[]) => {
                        this.data = res;
                        this.notify(this.data);
                        resolve(this.data);
                    })
                    .catch(err => this.handleError(err));
            } else {
                resolve(this.data);
            }
        });
    }

    notify = (data: Reminder[]): void => {
        if (this.observers && this.observers.length > 0) {
            if (this.autoLoad) {
                this.dataTimer = setInterval(() => this.loadData(), this.timeCache);
                this.autoLoad = false;
            }
            this.observers.forEach((observer: any) => observer(data));
        } else {
            clearInterval(this.dataTimer);
            clearInterval(this.consoleTimer);
            this.autoLoad = true;
        }
    }

    dismiss = (reminder: Reminder): Promise<Reminder> => {
        return this.http
            .put<Reminder>(`${this.url}/${reminder.id}/dismiss`, JSON.stringify(reminder), { headers: this.headers })
            .toPromise().then(() => this.loadData()).catch(err => this.handleError(err));
    }

    create = (reminder: Reminder): Promise<Reminder> => {
        return this.http
            .post<Reminder>(`${this.url}`, JSON.stringify(reminder), { headers: this.headers })
            .toPromise().then(() => this.loadData()).catch(err => this.handleError(err));
    }

    runConsoleTimer = (): void => {
        let i = 0;
        this.consoleTimer = setInterval(() => {
            i = i > this.timeCache / this.sec ? 1 : i;
            // tslint:disable-next-line: no-console
            console.log(`AutoLoad -`, this.timeCache / this.sec - i++, 'sec');
        }, this.sec);
    }

}
