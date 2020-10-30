import { Component, OnInit } from '@angular/core';
import {HousingAllowanceResourceService} from '../../../core/data';
import {NotificationService} from '../../../common/services';

@Component({
  selector: 'app-housing-allowance-stats',
  templateUrl: './housing-allowance-stats.component.html',
  styleUrls: ['./housing-allowance-stats.component.scss'],
})

export class HousingAllowanceStatsComponent implements OnInit {

  progectedYTD = 0;
  showLoadData = false;
  presentYear = new Date().getFullYear();
  lastYear = new Date().getFullYear() - 1;

  queries: string[] = [
    `items.any(period == 1) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 2) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 3) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 4) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 5) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 6) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 7) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 8) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 9) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 10) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 11) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 12) and startDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and startDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `items.any(period == 1) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 2) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 3) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 4) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 5) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 6) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 7) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 8) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 9) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 10) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 11) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `items.any(period == 12) and startDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
  ];

  resData: any = {
    lastYear1: 0,
    lastYear2: 0,
    lastYear3: 0,
    lastYear4: 0,
    lastYear5: 0,
    lastYear6: 0,
    lastYear7: 0,
    lastYear8: 0,
    lastYear9: 0,
    lastYear10: 0,
    lastYear11: 0,
    lastYear12: 0,
    yearThis1: 0,
    yearThis2: 0,
    yearThis3: 0,
    yearThis4: 0,
    yearThis5: 0,
    yearThis6: 0,
    yearThis7: 0,
    yearThis8: 0,
    yearThis9: 0,
    yearThis10: 0,
    yearThis11: 0,
    yearThis12: 0,
  };

  perCentArr = {
    perCentChange1: '',
    perCentChange2: '',
    perCentChange3: '',
    perCentChange4: '',
    perCentChange5: '',
    perCentChange6: '',
    perCentChange7: '',
    perCentChange8: '',
    perCentChange9: '',
    perCentChange10: '',
    perCentChange11: '',
    perCentChange12: '',
  };

  constructor(
    private housAllowSvc: HousingAllowanceResourceService,
    protected notificationSvc: NotificationService,
  ) { }

  ngOnInit(): void {
    this.showLoadData = true;
    this.getResPromises(this.queries, this.resData);
  }

  getResPromises(arrQueries: string[], values: any): void {
    const promiseArray = [];
    arrQueries.forEach(item => promiseArray.push(this.housAllowSvc.count(`${item}`)));
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
    const arrLast = [];
    const arrThis = [];
    let i = 0;
    for (const keyy in this.resData) {
      if (keyy) {
        i++;
        if (i < 13) {
          arrLast.push(this.resData[keyy]);
        } else {
          arrThis.push(this.resData[keyy]);
        }
      }
    }
    i = 0;
    for (const key in this.perCentArr) {
      if (key) {
        if (arrLast[i] === 0) {
          this.perCentArr[key] = '0 %';
        } else {
          this.perCentArr[key] = `${(((arrThis[i] - arrLast[i]) / arrLast[i]) * 100).toFixed(0)} %`;
        }
        i++;
      }
    }
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
