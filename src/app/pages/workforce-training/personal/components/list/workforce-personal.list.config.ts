import { Injectable, Inject, Injector } from '@angular/core';
import {IDataService, IListWithTriggersConfig, ITriggerService} from '../../../../../common/interfaces';
import {WorkforceTrainingPersonal} from '../../../../../core/model';
import {TriggerService, WorkforceTrainingPersonalService} from '../../../../../core/data';


@Injectable()
export class WorkforcePersonalListConfig implements IListWithTriggersConfig<WorkforceTrainingPersonal> {
    triggerType = '';
  componentTitle = 'Workforce personal';
  includes = 'Items,EmploymentRecord.Application,EmploymentRecord.CompanyTrade';
  selectJSONPath = 'maxHours;items[*].totalHours;items[*].month;items[*].maxHours;employmentRecordId;employmentRecord.application.firstName;employmentRecord.application.lastName;employmentRecord.application.isActive';
  constructor(
        @Inject(WorkforceTrainingPersonalService) public dataSvc: IDataService<WorkforceTrainingPersonal>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        public injector: Injector,
    ) { }
}
