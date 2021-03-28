import { Component, OnChanges, Injector, ViewChild, Input, Inject } from '@angular/core';

import * as dateFns from 'date-fns';
import {ConfirmComponent} from '../../../common/components/confirm';
import {Company} from '../../../core/model';
import {ObservableService} from '../../../common/services';
import {ComponentBaseDirective} from '../../../common/base-classes/componentBase';
import {IBaseConfig} from '../../../common/interfaces';
import {Reminder} from '../../../core/model/reminder';
import {IReminderObj} from '../../../common/interfaces/IReminderService';


class CalendarDay { date: Date; reminders: Reminder[]; }
class Row { data: CalendarDay[] = []; }
class Calendar { row: Row[] = []; }
export class ReminderConfig { url: string; element: any; section: string; category: string; }

@Component({
    selector: 'app-reminder',
    templateUrl: 'reminder.component.html',
    styleUrls: ['reminder.component.scss'],
    providers: [ObservableService],
})

export class ReminderComponent extends ComponentBaseDirective implements OnChanges {
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
    @Input() category: string;
    @Input() general: boolean;
    @Input() reminderConfig: ReminderConfig;
    @Input() showButton = false;


    selectCompany: Company;

    // @Input() section: string;
    // @Input() url: string;
    // @Input() item: any;

    reminderObj: IReminderObj;
    notificationReminders: Reminder[] = [];
    activeReminders: Reminder[] = [];
    data: Reminder[] = [];
    editReminder: Reminder;
    showCalendar = false;
    showDetails = false;
    showDismiss = true;
    timer: any;

    calendar: Calendar = new Calendar();
    currentMonth: Date = new Date();
    daysStartDate: Date = new Date();
    monthStart: Date;
    monthEnd: Date;
    dateFns = dateFns;
    dateFormat = 'MMMM YYYY';
    daysFormat = 'dddd';

    constructor(
        protected injector: Injector,
        @Inject(ObservableService) public observableSvc: ObservableService,
    ) {
        super({ componentTitle: 'Reminder', injector } as IBaseConfig);
    }

    observableSource(keyword: any): void {
        return this.observableSvc.observableSourceCompanies.bind(keyword);
    }

    companyChanged = (company: Company): void => {
        // this.editReminder.data.company = company;
        this.selectCompany = company;
    }

    getReminders = (unsubscribe: boolean = false): void => {
        if (unsubscribe) {
            this.timer = null;
            if (this.reminderObj) {
                this.reminderSvc.unsubscribe(this.reminderObj.key);
            }
        } else {
            this.reminderObj = this.reminderSvc.subscribe((data: any) => this.dataLoaded(data));
            this.notificationSvc.subscribeReminder(r => this.onDismiss(r));

        }
    }

    setUrlReminder = () => {
        this.addReminder(new Date(), null);
        this.editReminder.headerText = this.reminderConfig.category;
        this.editReminder.siteUrl = this.reminderConfig.url;
        this.editReminder.data = {comany: new Company()};
        if (this.reminderConfig.section) {
            this.editReminder.siteUrl += `/${this.reminderConfig.section}`;
        }
        // if (this.reminderSetting.element && )
        console.log(this.reminderConfig);
    }

    dataLoaded = (data: Reminder[]): void => {
        this.data = data;
        this.updateDate();
        this.timer = null;
        this.setTimer();
    }

    updateDate = (): void => {
        this.getMonthDates();
        this.activeReminders = this.data.filter(x => x.isDismissed === false);
        this.notificationReminders = [];
        this.showLoadData = false;
        this.setNotifications();
    }

    isFuture = (reminder: Reminder): boolean => {
        return new Date(reminder.activeAfterUtc).getTime() > new Date().getTime();
    }

    setNotifications = (): void => {
        if (this.activeReminders.length > 0) {
            this.activeReminders.forEach((reminder: Reminder) => {
                if (new Date(reminder.activeAfterUtc).getTime() <= new Date().getTime()) {
                    const added = this.notificationReminders.find(x => x.id === reminder.id);
                    if (!added) {
                        this.notificationReminders.push(reminder);
                    }
                }
            });
          // tslint:disable-next-line:max-line-length
            this.notificationSvc.notifyReminder(this.notificationReminders.sort((a, b) => new Date(a.activeAfterUtc).getTime() - new Date(b.activeAfterUtc).getTime()));
        }
    }

    setTimer = (): void => {
        this.timer = setInterval(() => this.setNotifications(), 1000 * 2);
    }

    getDayReminders = (date: Date): Reminder[] => {
        const dates = [];
        this.data.forEach((reminder: Reminder) => {
            if (this.dateFns.isEqual(this.formatedDate(date), this.formatedDate(reminder.activeAfterUtc))) {
                dates.push(reminder);
            }
        });
        return dates.length > 1 ? dates.sort((a, b) => new Date(a.activeAfterUtc).getTime() - new Date(b.activeAfterUtc).getTime()) : dates;
    }

    getMonthDates = (): void => {
        this.monthStart = dateFns.startOfMonth(this.currentMonth);
        this.monthEnd = dateFns.endOfMonth(this.monthStart);
        this.calendar = new Calendar();
        let format: Date;

        while (this.monthStart <= this.monthEnd) {
            const row = new Row();
            for (let i = 0; i < 7; i++) {
                const day = new CalendarDay();
                format = this.formatedDate(this.monthStart) as Date;
                day.date = format as Date;
                day.reminders = this.getDayReminders(format);
                row.data.push(day);
                this.monthStart = dateFns.addDays(this.monthStart, 1);
            }
            this.calendar.row.push(row);
        }
    }

    createReminder = (): void => {
        this.editReminder.activeAfterUtc = this.getDate(this.editReminder.activeAfterUtc);
        this.showLoadData = true;
        this.reminderSvc.create(this.editReminder)
            .then((res: Reminder) => {
                this.data.push(res);
                this.updateDate();
                this.editReminder = null;
            })
            .catch(err => this.onHttpError(err));
    }

    addReminder = (date: Date, e: Event): void => {
        e && e.stopPropagation();
        this.editReminder = new Reminder();
        this.editReminder.activeAfterUtc = new Date(date);
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        this.editReminder.time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        this.editReminder.activeAfterUtc = this.getDate(this.editReminder.activeAfterUtc);
    }

    dismissReminder = (reminder: Reminder, e: Event): void => {
        e && e.stopPropagation();
        if (reminder && !reminder.isDismissed && !this.isFuture(reminder)) {
            this.confirm.show('confirm', 'Are you sure to dismiss this item?')
                .then(answer => {
                    if (answer) {
                        this.showLoadData = true;
                        this.reminderSvc.dismiss(reminder)
                            .then(res => {
                                if (res) {
                                    const index = this.data.findIndex(x => x.id === res.id);
                                    if (index >= 0) { this.data[index] = res; }
                                    this.updateDate();
                                } else {
                                    const index = this.data.findIndex(x => x.id === reminder.id);
                                    if (index >= 0) { this.data[index].isDismissed = true; }
                                    this.updateDate();
                                }
                            })
                            .catch(err => this.onHttpError(err));
                    }
                });
        }
    }

    deleteReminder = (reminder: Reminder, e: Event): void => {
        e && e.stopPropagation();
        if (reminder) {
            this.confirm.show('confirm', 'Are you sure to delete this item?')
                .then(answer => {
                    if (answer) {
                        this.showLoadData = true;
                        this.reminderSvc.delete(reminder)
                            .then(() => {
                                const index = this.data.findIndex(x => x.id === reminder.id);
                                if (index >= 0) { this.data.splice(index, 1); }
                                this.updateDate();
                            })
                            .catch(err => this.onHttpError(err));
                    }
                });
        }
    }

    clickEvent = (reminder: Reminder, e: Event): void => {
        e && e.stopPropagation();
        this.editReminder = reminder;
        this.showDetails = true;
        if (this.editReminder.activeAfterUtc) {
            const hours = new Date(this.editReminder.activeAfterUtc).getHours();
            const minutes = new Date(this.editReminder.activeAfterUtc).getMinutes();
            this.editReminder.time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        }
    }

    formatedDate(inDate: Date): string | Date {
        if (inDate) {
            inDate = new Date(inDate);
            return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
        } else {
            return new Date();
        }
    }

    ngOnChanges = (): void => {
        this.daysStartDate = dateFns.startOfWeek(this.currentMonth);
        this.getMonthDates();
    }

    nextMonth = (e: Event): void => {
        e && e.stopPropagation();
        this.currentMonth = dateFns.addMonths(this.currentMonth, 1);
        this.getMonthDates();
    }

    prevMonth = (e: Event): void => {
        e && e.stopPropagation();
        this.currentMonth = dateFns.subMonths(this.currentMonth, 1);
        this.getMonthDates();
    }

    addDate = (date: Date): void => {
        this.editReminder.activeAfterUtc = this.getDate(date);
    }

    getDate = (date: Date): Date => {
        date = new Date(date);
        const mount = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        return new Date(date.getFullYear(), +mount, date.getDate(), this.editReminder.time.split(':')[0], this.editReminder.time.split(':')[1]);
    }

    onDismiss = (reminder: Reminder): void => {
        this.dismissReminder(reminder, null);
    }

    selectEvent = (e: Event): void => {
        e && e.stopPropagation();
        this.showCalendar = false;
    }

    outsideClick = (e: Event): void => {
        e ? e.stopPropagation() : this.showCalendar = false;
    }

    cancelEdit = (e: Event): void => {
        e && e.stopPropagation();
        this.editReminder = null;
        this.showDetails = false;
    }
}
