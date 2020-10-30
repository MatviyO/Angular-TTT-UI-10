import { Component, OnInit } from '@angular/core';
import {MentorshipResourceService} from '../../../core/data';
import {NotificationService} from '../../../common/services';

@Component({
  selector: 'app-mentorship-stats',
  templateUrl: './mentorship-stats.component.html',
  styleUrls: ['./mentorship-stats.component.scss'],
})

export class MentorshipStatsComponent implements OnInit {

  showLoadData = false;
  presentYear = new Date().getFullYear();
  lastYear = new Date().getFullYear() - 1;

  perCentChange: string;

  queries: string[] = [
    ``,
    `feedbacks.any()`,
    `feedbacks.any(date > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and date < "${this.formatDate(new Date(this.lastYear, 11, 31))}")`,
    `feedbacks.any(date > "${this.formatDate(new Date(this.presentYear, 0, 1))}")`,
  ];

  resData: any = {
    allHaveParticipated: 0,
    allMeets: 0,
    meetingLast: 0,
    meetingYtd: 0,
  };

  constructor(
    private mentorSvc: MentorshipResourceService,
    protected notificationSvc: NotificationService,
  ) { }

  ngOnInit(): void {
    this.showLoadData = true;
    this.getResPromises(this.queries, this.resData);
  }

  getResPromises(arrQueries: string[], values: any): void {
    const promiseArray = [];
    arrQueries.forEach(item => promiseArray.push(this.mentorSvc.count(`${item}`)));
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
    if (this.resData.meetingLast === 0) {
      this.perCentChange = '0 %';
      return;
    }
    this.perCentChange = `${(((this.resData.meetingYtd - this.resData.meetingLast) / this.resData.meetingLast) * 100).toFixed(0)} %`;
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
