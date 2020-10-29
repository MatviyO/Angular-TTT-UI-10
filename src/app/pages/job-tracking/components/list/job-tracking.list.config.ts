import { Injectable, Inject, Injector } from '@angular/core';
import {EmploymentRecord} from '../../../../core/model';
import {IComponentConfig, IDataService} from '../../../../common/interfaces';
import {JobTrackingService} from '../../../../core/data';


@Injectable()
export class JobTrackingListConfig implements IComponentConfig<EmploymentRecord> {
    cls: new () => any = EmploymentRecord;
    componentTitle = 'Employments';
    includes = 'Application,Stages.Status,Stages.Notes,Stages.Location,CompanyTrade.Company.Trades';
     constructor(
        @Inject(JobTrackingService) public dataSvc: IDataService<EmploymentRecord>,
        public injector: Injector,
    ) { }
}
