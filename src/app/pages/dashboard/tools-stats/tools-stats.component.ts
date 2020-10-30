import {Component, OnInit} from '@angular/core';
import {ToolsResourceService} from '../../../core/data';
import {NotificationService} from '../../../common/services';

@Component({
  selector: 'app-tools-stats',
  templateUrl: './tools-stats.component.html',
  styleUrls: ['./tools-stats.component.scss'],
})

export class ToolsStatsComponent implements OnInit {

  showLoadData = false;
  presentYear = new Date().getFullYear();
  lastYear = new Date().getFullYear() - 1;

  perCentHistoric: string;
  perCentLastYear: string;
  perCentNowYear: string;

  queries: string[] = [
    `toolsReceived > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and toolsReceived < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `toolsReceived > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    'toolsReceived != null',
    'toolsNeeded == true',  // second table
    'lastDateSet.contains("POReceived")',
    'lastDateSet.contains("InvoiceSent")',
    'lastDateSet.contains("ToolsOrdered")',
    'lastDateSet.contains("CheckReceived")',
    'lastDateSet.contains("ToolsReceived")',
  ];

  resData: any = {
    getToolsLastYear: 0,
    getToolsNowYear: 0,
    totalCompleted: 0,
    toolsNeeded: 0, // second table
    poReceived: 0,
    invoiceSend: 0,
    toolsOrdered: 0,
    checkReceived: 0,
    toolsReceived: 0,
  };

  constructor(
    private toolsSvc: ToolsResourceService,
    protected notificationSvc: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.showLoadData = true;
    this.getResPromises(this.queries, this.resData);
  }

  getResPromises(arrQueries: string[], values: any): void {
    const promiseArray = [];
    arrQueries.forEach(item => promiseArray.push(this.toolsSvc.count(`${item}`)));
    Promise.all(promiseArray).then((res) => {
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
    if (this.resData.toolsNeeded === 0) {
      this.perCentHistoric = '0 %';
      this.perCentLastYear = '0 %';
      this.perCentNowYear = '0 %';
      return;
    }
    this.perCentHistoric = `${(this.resData.totalCompleted / this.resData.toolsNeeded * 100).toFixed(0)} %`;
    this.perCentLastYear = `${(this.resData.getToolsLastYear / this.resData.toolsNeeded * 100).toFixed(0)} %`;
    this.perCentNowYear = `${(this.resData.getToolsNowYear / this.resData.toolsNeeded * 100).toFixed(0)} %`;
    this.showLoadData = false;
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

