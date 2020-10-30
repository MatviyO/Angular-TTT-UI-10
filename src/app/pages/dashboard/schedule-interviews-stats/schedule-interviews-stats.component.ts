import { Component, OnInit } from '@angular/core';
import {GraduationDatesService, InterviewResourceService} from '../../../core/data';
import {Graduation} from '../../../core/model/properties';
import {NotificationService} from '../../../common/services';

@Component({
  selector: 'app-schedule-interviews-stats',
  templateUrl: './schedule-interviews-stats.component.html',
  styleUrls: ['./schedule-interviews-stats.component.scss'],
})

export class ScheduleInterviewsStatsComponent implements OnInit {

  previousDate: Date;
  nextDate: Date;
  futureDate: Date;
  allFutureGradDates: Graduation[];
  perCentChange: string;
  presentYear = new Date().getFullYear();
  lastYear = new Date().getFullYear() - 1;
  showLoadData = false;

  queries: string[] = [
    ``,
    `stages.any(date > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and date < "${this.formatDate(new Date(this.lastYear, 11, 31))}")`,
    `stages.any(date > "${this.formatDate(new Date(this.presentYear, 0, 1))}")`,
  ];

  resData: any = {
    allInterviews: 0,
    lastInterviews: 0,
    ytdInterviews: 0,
  };

  constructor(
    private interviewsSvc: InterviewResourceService,
    private gradDatesSvc: GraduationDatesService,
    protected notificationSvc: NotificationService,
  ) { }

  ngOnInit(): void {
    this.showLoadData = true;
    this.gradDatesSvc.query(`graduationDate > "${this.formatDate(new Date())}"`)
      .then(res => {
        this.allFutureGradDates = res;
        if (res.length === 1) {
          this.nextDate = this.allFutureGradDates[0].date;
        }
      })
      .catch(err => this.onHttpError(err));
    this.getResPromises(this.queries, this.resData);
  }

  getResPromises(arrQueries: string[], values: any): void {
    const promiseArray = [];
    arrQueries.forEach(item => promiseArray.push(this.interviewsSvc.count(`${item}`)));
    Promise.all(promiseArray)
      .then((res) => {
        let i = 0;
        for (const key in values) {
          if (key) {
            this.resData[key] = res[i];
            i++;
          }
        }
        this.getPerCent();
        this.showLoadData = false;
      })
      .catch(err => this.onHttpError(err));
  }

  getPerCent(): void {
    if (this.resData.earnedLast === 0) {
      this.perCentChange = '0 %';
      return;
    }
    this.perCentChange = `${(((this.resData.earnedYTD - this.resData.earnedLast) / this.resData.earnedLast) * 100).toFixed(0)} %`;
  }

  formatDate(d: Date): string {
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  onHttpError(error: any): void {
    const type = 'Program stats';
    if (error) {
      this.showLoadData = false;
      if (error.status === 404) {
        this.notificationSvc.error(type, 'No records found with specified ID');
        return;
      }
      if (error.status === 401) {
        this.notificationSvc.error(type, 'Not authorized !');
        return;
      }
      if (error._body) {
        this.notificationSvc.error(type, error._body);
        return;
      }
    }
    this.showLoadData = false;
    this.notificationSvc.error(type, 'Failed to process request ');
  }

}
