import { Component, OnInit } from '@angular/core';
import {ToolsResourceService} from '../../../core/data';
import {NotificationService} from '../../../common/services';


@Component({
  selector: 'app-interview-feedback-stats',
  templateUrl: './interview-feedback-stats.component.html',
  styleUrls: ['./interview-feedback-stats.component.scss'],
})

export class InterviewFeedbackStatsComponent implements OnInit {

  showLoadData = false;
  presentYear = new Date().getFullYear();
  lastYear = new Date().getFullYear() - 1;

  perCentHistoric: string;
  perCentLastYear: string;
  perCentNowYear: string;

  queries: string[] = [
  ];

  resData: any = {

  };


  constructor(
    private toolsSvc: ToolsResourceService,
    protected notificationSvc: NotificationService,

  ) { }

  ngOnInit(): void {
    this.showLoadData = true;
    this.getResPromises(this.queries, this.resData);
  }

  getResPromises(arrQueries: string[], values: any): void {
    const promiseArray = [];
    arrQueries.forEach(item => promiseArray.push(this.toolsSvc.count(`${item}`)));
    Promise.all(promiseArray)
      .then((res) => {
        let i = 0;
        for (const key in values) {
          if (key) {
            this.resData[key] = res[i];
            i++;
          }
        }
        this.showLoadData = false;
      })
      .catch(err => this.onHttpError(err));
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
