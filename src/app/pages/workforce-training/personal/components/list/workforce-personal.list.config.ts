import { Injectable, Inject, Injector } from '@angular/core';
import { IListWithTriggersConfig, ITriggerService, IDataService } from '@ttt/common/interfaces';
import { WorkforceTrainingPersonal, WorkforceTrainingPersonalService, TriggerService } from '@ttt/core';

@Injectable()
export class WorkforcePersonalListConfig implements IListWithTriggersConfig<WorkforceTrainingPersonal> {
    triggerType: string = '';
    componentTitle = 'Workforce personal';
    includes = 'Items,EmploymentRecord.Application,EmploymentRecord.CompanyTrade';
    selectJSONPath = 'maxHours;items[*].totalHours;items[*].month;items[*].maxHours;employmentRecordId;employmentRecord.application.firstName;employmentRecord.application.lastName;employmentRecord.application.isActive';
    constructor(
        @Inject(WorkforceTrainingPersonalService) public dataSvc: IDataService<WorkforceTrainingPersonal>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,        
        public injector: Injector,
    ) { }
}
