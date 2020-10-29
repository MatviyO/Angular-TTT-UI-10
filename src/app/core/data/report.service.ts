import { Injectable, Injector } from '@angular/core';

import * as moment from 'moment';
import {EmploymentReport, InterviewReport} from '../model/reports';
import {BaseEntity} from '../../common/entities';
import {BaseDataService} from '../../common/services';

@Injectable()
export class ReportService<T extends BaseEntity> extends BaseDataService<T> {

  getReport(arg: { key: string, value: string }[], fileName: string = null): Promise<EmploymentReport | any> {
    return this.http.get(this.urlProvider.query(this.url, '', null, null, null, arg), { responseType: 'arraybuffer' })
      .toPromise()
      .then(response => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'file.xlsx');
        document.body.appendChild(link);
        link.download = `${fileName ? `${fileName}_` : ''} Report_${moment().format('L')}.xlsx`;
        link.click();
        document.body.removeChild(link);
      });
  }
}

@Injectable()
export class EmploymentReportService extends ReportService<EmploymentReport> {
  constructor(injector: Injector) {
    super(injector, 'api/Reports/EmploymentReport');
  }
}

@Injectable()
export class InterviewReportService extends ReportService<InterviewReport> {
  constructor(injector: Injector) {
    super(injector, 'api/Reports/InterviewReport');
  }
}

@Injectable()
export class MilitaryClassReportService extends ReportService<any> {
  constructor(injector: Injector) {
    super(injector, 'api/Reports/sc/MilitaryClassAvailability?export=report.xslx');
  }
}
