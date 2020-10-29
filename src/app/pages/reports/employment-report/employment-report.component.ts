import { Component, OnInit, Inject } from '@angular/core';
import { EmploymentReportConfig } from './employment-report.config';

import * as moment from 'moment';
import {AffiliationTypesService, EmploymentReportService} from '../../../core/data';
import {EmploymentReport} from '../../../core/model/reports';
import {IEditorConfig} from '../../../common/interfaces';
import {AffiliationType} from '../../../core/model/properties/application-affiliation';
import {BaseSortableListDirective} from '../../../common/base-classes';


export interface EmploymentReportFilter {
  startDate: moment.Moment;
  endDate: moment.Moment;
  campbellStrong: boolean;
  applicationTypes: string[];
}

export const getDefaultFilter = (): EmploymentReportFilter => {
  return {
    startDate: moment().subtract(2, 'years'),
    endDate: moment(),
    campbellStrong: false,
    applicationTypes: ['Veteran', 'Military'],
  };
};

@Component({
  selector: 'app-employment-report',
  templateUrl: './employment-report.component.html',
  styleUrls: ['./employment-report.component.scss'],
  providers: [EmploymentReportConfig, AffiliationTypesService],
})

export class EmploymentReportComponent extends BaseSortableListDirective<EmploymentReport> implements OnInit {
  campbelStrongAffiliation: AffiliationType;
  showfilter = true;
  filter = getDefaultFilter();
  take = null;
  skip = null;

  constructor(
    @Inject(EmploymentReportConfig) config: IEditorConfig<EmploymentReport>,
    private affiliationTypesSvc: AffiliationTypesService,
    private reportSvc: EmploymentReportService,
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
    this.reportSvc.getReport(this.getFilterArguments(true), 'Employment')
      .catch(err => this.onHttpError(err));
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

