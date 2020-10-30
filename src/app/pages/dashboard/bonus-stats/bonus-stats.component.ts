import { Component, OnInit } from '@angular/core';
import {ProfileResourceService, TriggerService} from '../../../core/data';
import {NotificationService} from '../../../common/services';

@Component({
  selector: 'app-bonus-stats',
  templateUrl: './bonus-stats.component.html',
  styleUrls: ['./bonus-stats.component.scss'],
})

export class BonusStatsComponent implements OnInit {
  progectedYTD = 0;
  perCentChange: string;
  showLoadData = false;
  presentYear = new Date().getFullYear();
  lastYear = new Date().getFullYear() - 1;

  queries: string[] = [
    `hillerBonusPaidDate != null`,
    `hillerBonusPaidDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and hillerBonusPaidDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `hillerBonusPaidDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
  ];

  resData: any = {
    allEarnedBonus: 0,
    earnedLast: 0,
    earnedYTD: 0,
  };

  constructor(
    private profileSvc: ProfileResourceService,
    protected notificationSvc: NotificationService,
    protected triggerSvc: TriggerService,
  ) { }

  ngOnInit(): void {
    this.showLoadData = true;
    this.triggerSvc.queryByCategory('6', `Severity== 0`)
      .subscribe(
        res => this.progectedYTD = res.length,
        err => this.onHttpError(err),
      );
    this.getResPromises(this.queries, this.resData);
  }

  getResPromises(arrQueries: string[], values: any): void {
    const promiseArray = [];
    arrQueries.forEach(item => promiseArray.push(this.profileSvc.count(`${item}`)));
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
