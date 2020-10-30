import { Injectable, Inject, Injector } from '@angular/core';
import {WorkforceTrainingPersonal} from '../../../../../core/model';
import {TriggerHelper, TriggerService, WorkforceTrainingPersonalService} from '../../../../../core/data';
import {IDataService, IEditorWithTriggersConfig, ITriggerHelper, ITriggerService} from '../../../../../common/interfaces';

@Injectable()
export class WorkforcePersonalDetailsConfig implements IEditorWithTriggersConfig<WorkforceTrainingPersonal> {
    cls: new () => any = WorkforceTrainingPersonal;
    triggerCategory = ' ';
    componentTitle = 'Workforce personal';
    includes = 'Items,EmploymentRecord.Application,EmploymentRecord.CompanyTrade';

    constructor(
        @Inject(WorkforceTrainingPersonalService) public dataSvc: IDataService<WorkforceTrainingPersonal>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
