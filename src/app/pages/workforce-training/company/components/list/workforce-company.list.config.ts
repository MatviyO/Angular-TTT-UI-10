import { Injectable, Inject, Injector } from '@angular/core';
import {TriggerService, WorkforceTrainingCompanyService} from '../../../../../core/data';
import {WorkforceTrainingCompany} from '../../../../../core/model';
import {IDataService, IEditorConfig, ITriggerService} from '../../../../../common/interfaces';

@Injectable()
export class WorkforceCompanyListConfig implements IEditorConfig<WorkforceTrainingCompany> {
    cls: new() => any = WorkforceTrainingCompany;
    triggerType = '';
    componentTitle = 'Workforce company';
    // tslint:disable-next-line:max-line-length
    selectJSONPath = 'id;month;year;totalHours;rowVersion;amount;checkNumber;submitted;received;items[*].rowVersion;items[*].year;items[*].month;items[*].hillerWorkforceTrainingPersonalId;items[*].hillerWorkforceTrainingPersonal.employmentRecord.application.lastName;items[*].hillerWorkforceTrainingPersonal.employmentRecord.application.firstName;items[*].hillerWorkforceTrainingPersonal.employmentRecord.application.isActive';

    constructor(
        @Inject(WorkforceTrainingCompanyService) public dataSvc: IDataService<WorkforceTrainingCompany>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        public injector: Injector,
    ) { }
}
