import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';

import { InterviewReportConfig } from './interview-report.config';
import {InterviewReport} from '../../../core/model/reports';
import {IEditorConfig} from '../../../common/interfaces';
import {InterviewReportService} from '../../../core/data';
import {BaseSortableListDirective} from '../../../common/base-classes';


export interface InterviewReportFilter {
  startDate: moment.Moment ;
  endDate: moment.Moment;
  applicationTypes: string[];
}

export const getDefaultFilter = (): InterviewReportFilter => {
  return {
    startDate: moment().subtract(2, 'years'),
    endDate: moment(),
    applicationTypes: ['Veteran', 'Military'],
  };
};

@Component({
  selector: 'app-interview-report',
  templateUrl: './interview-report.component.html',
  styleUrls: ['./interview-report.component.scss'],
  providers: [InterviewReportConfig],
})

export class InterviewReportComponent extends BaseSortableListDirective<InterviewReport> implements OnInit {
  showfilter = true;
  filter = getDefaultFilter();
  take = null;
  skip = null;

  constructor(
    @Inject(InterviewReportConfig) config: IEditorConfig<InterviewReport>,
    private reportSvc: InterviewReportService,
  ) {
    super(config);
  }


  getData(): void {
    const filterArg = this.getFilterArguments();
    if (filterArg && filterArg.length > 0) {
      super.getData(filterArg);
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  resetFilter(): void {
    this.filter = getDefaultFilter();
    super.onSearch();
  }

  downloadReport(): void {
    this.reportSvc.getReport(this.getFilterArguments(true), 'Interview').catch(err => this.onHttpError(err));
  }

  getFilterArguments(downlooad: boolean = false): { key: string, value: string }[] {
    const filterArg = [];
    if (this.filter.startDate) {
      filterArg.push({ key: 'startDate', value: moment(this.filter.startDate).format('L') });
    }
    if (this.filter.endDate) {
      filterArg.push({ key: 'endDate', value: moment(this.filter.endDate).format('L') });
    }
    if (this.filter.applicationTypes) {
      this.filter.applicationTypes.forEach(type => type && filterArg.push({ key: 'appTypes', value: type }));
    }
    if (downlooad) {
      filterArg.push({ key: 'export', value: 'empl_report' });
    }
    return filterArg;
  }

  getFilterFormatted(): string {
    return '';
  }

}

