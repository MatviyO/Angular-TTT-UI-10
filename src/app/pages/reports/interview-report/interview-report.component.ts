import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';

import { InterviewReportConfig } from './interview-report.config';
import {AffiliationTypesService, InterviewReportService} from '../../../core/data';
import {InterviewReport} from '../../../core/model/reports';
import {IEditorConfig} from '../../../common/interfaces';
import {getDefaultFilter, JobReportFilter} from '../employment-report/employment-report.component';
import {AffiliationType} from '../../../core/model/properties/application-affiliation';
import {BaseSortableListDirective} from '../../../common/base-classes';



@Component({
  selector: 'app-interview-report',
  templateUrl: './interview-report.component.html',
  styleUrls: ['./interview-report.component.scss'],
  providers: [InterviewReportConfig, AffiliationTypesService],
})

export class InterviewReportComponent extends BaseSortableListDirective<InterviewReport> implements OnInit {
  campbelStrongAffiliation: AffiliationType;
  showfilter = true;
  filter: JobReportFilter = getDefaultFilter();
  take = null;
  skip = null;


  constructor(
    @Inject(InterviewReportConfig) config: IEditorConfig<InterviewReport>,
    private affiliationTypesSvc: AffiliationTypesService,
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
    this.affiliationTypesSvc.query('description.contains("Campbell")', '', null, 'null')
      .then(res => this.campbelStrongAffiliation = res && res.length > 0 ? res[0] : null)
      .catch((e) => this.onHttpError(e));
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
    if (this.filter.campbellStrong && this.campbelStrongAffiliation) {
      filterArg.push({ key: 'appAffTypeId', value: this.campbelStrongAffiliation.id });
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

