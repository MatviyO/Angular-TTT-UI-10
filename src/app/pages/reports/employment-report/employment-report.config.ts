import { Injectable, Inject, Injector } from '@angular/core';
import {IComponentConfig, IDataService} from '../../../common/interfaces';
import {EmploymentReport} from '../../../core/model/reports';
import {EmploymentReportService} from '../../../core/data';



@Injectable()
export class EmploymentReportConfig implements IComponentConfig<EmploymentReport> {
  componentTitle = 'Employment report';

  constructor(
    @Inject(EmploymentReportService) public dataSvc: IDataService<EmploymentReport>,
    public injector: Injector,
  ) { }
}
