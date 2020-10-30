import { Injectable, Inject, Injector } from '@angular/core';

import { IEditorWithTriggersConfig, ITriggerService, IDataService, ITriggerHelper } from '@ttt/common/interfaces';

import { WorkforceTrainingPersonal, WorkforceTrainingPersonalService, TriggerService, TriggerHelper } from '@ttt/core';

@Injectable()
export class WorkforcePersonalDetailsConfig implements IEditorWithTriggersConfig<WorkforceTrainingPersonal> {
    cls: { new (): any } = WorkforceTrainingPersonal;
    triggerCategory: string = ' ';
    componentTitle: string = 'Workforce personal';
    includes = 'Items,EmploymentRecord.Application,EmploymentRecord.CompanyTrade';

    constructor(
        @Inject(WorkforceTrainingPersonalService) public dataSvc: IDataService<WorkforceTrainingPersonal>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,        
        public injector: Injector,
    ) { }
}
