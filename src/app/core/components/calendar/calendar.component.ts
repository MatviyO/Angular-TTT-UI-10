import { Component, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import * as dateFns from 'date-fns';

class ApprovedDate {
    date: Date | string = new Date();
    approved = false;
    requested = false;
}

class Row {
    date: ApprovedDate[] = [];
}
class Calendar {
    row: Row[] = [];
}
@Component({
    selector: 'app-calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.scss'],
    providers: [],
})


export class CalendarComponent implements OnChanges {
    @Output() onSelect = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    @Output() addDay = new EventEmitter();
    @Input() daysAll: ApprovedDate[];
    @Input() requestDates: ApprovedDate[];

    calendar: Calendar = new Calendar();

    days: Date[] = [];
    daysOf: string[] = [];
    addedAssignments: number[] = [];
    currentMonth: Date = new Date();
    isMoving = false;
    header = '';
    dateFns = dateFns;
    dateFormat = 'MMMM YYYY';
    daysFormat = 'dddd';
    cellFormat = 'DD';
    daysStartDate: Date = new Date();

    monthStart: Date;
    monthEnd: Date;
    startDate: Date;
    endDate: Date;
    rangeDates: Date[] = [];
    rowCount = 0;


  // tslint:disable-next-line:typedef
    ngOnChanges() {
        this.daysStartDate = dateFns.startOfWeek(this.currentMonth);
        this.getMonthDates();
    }

  // tslint:disable-next-line:typedef
    nextMonth() {
        this.currentMonth = dateFns.addMonths(this.currentMonth, 1);
        this.getMonthDates();
    }
  // tslint:disable-next-line:typedef
    prevMonth() {
        this.currentMonth = dateFns.subMonths(this.currentMonth, 1);
        this.getMonthDates();
    }
  // tslint:disable-next-line:typedef
    getMonthDates() {
        this.monthStart = dateFns.startOfMonth(this.currentMonth);
        this.monthEnd = dateFns.endOfMonth(this.monthStart);
        this.startDate = dateFns.startOfWeek(this.monthStart);
        this.endDate = dateFns.endOfWeek(this.monthEnd);
        this.calendar = new Calendar();
        let format: Date | string;

        while (this.monthStart <= this.monthEnd) {
          // tslint:disable-next-line:typedef variable-name
            const _row = new Row();
            for (let i = 0; i < 7; i++) {
              // tslint:disable-next-line:typedef variable-name
                const _approve = new ApprovedDate();
                format = this.formatedDate(this.monthStart);
                _approve.date = format;
                // @ts-ignore
                _approve.approved = this.daysAll.some(a => this.dateFns.isEqual(a.date, format) && a.approved === true);
                // @ts-ignore
                _approve.requested = this.requestDates.some(a => this.dateFns.isEqual(a.date, format) && a.approved === false);
                _row.date.push(_approve);
                this.monthStart = dateFns.addDays(this.monthStart, 1);
            }
            this.calendar.row.push(_row);
        }
    }

  // tslint:disable-next-line:typedef
    selectDate(date: string) {
        this.addDay.emit(date);
        this.getMonthDates();
    }


    formatedDate(inDate: Date): string | Date {
        if (inDate) {
            inDate = new Date(inDate);
            return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
        } else {
            return new Date();
        }
    }

  // tslint:disable-next-line:typedef
    cancelEvent() {
        this.onCancel.emit();
    }

  // tslint:disable-next-line:typedef
    selectEvent() {
        this.onSelect.emit();
    }

}
