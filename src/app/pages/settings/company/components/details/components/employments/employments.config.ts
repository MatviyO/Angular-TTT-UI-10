import { Injectable, Inject, Injector } from '@angular/core';
import {EmploymentRecord} from '../../../../../../../core/model';
import {IDataService, IEditorConfig} from '../../../../../../../common/interfaces';
import {CompanyEmploymentService} from '../../../../../../../core/data';

@Injectable()
export class EmploymentComponentConfig implements IEditorConfig<EmploymentRecord> {
  cls: new () => any = EmploymentRecord;
  componentTitle = 'Employments';
  // includes = 'Application,Stages.Status,Stages.Notes,Stages.Location,CompanyTrade.Company.Trades';
  includes = 'Application,Stages.InterviewOutcome,Stages.Status,Stages.Notes,Stages.Location,CompanyTrade.Company.Trades';

  constructor(
    @Inject(CompanyEmploymentService) public dataSvc: IDataService<EmploymentRecord>,
    public injector: Injector,
  ) { }
}
