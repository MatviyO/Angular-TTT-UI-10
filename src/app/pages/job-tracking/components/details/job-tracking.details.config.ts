import { Injectable, Inject, Injector } from '@angular/core';
import {EmploymentRecord} from '../../../../core/model';
import {EmploymentService, TriggerHelper, TriggerService} from '../../../../core/data';
import {IDataService, IEditorStatefulConfig, ITriggerHelper, ITriggerService} from '../../../../common/interfaces';


@Injectable()
export class JobTrackingDetailsConfig implements IEditorStatefulConfig<EmploymentRecord> {
    navigationTitle = 'Job-tracking';
    navigationUrlPrefix = 'job-tracking';
    cls: new () => EmploymentRecord = EmploymentRecord;
    triggerType = 'Interview';
    componentTitle = 'Job-tracking';

    constructor(
        @Inject(EmploymentService) public dataSvc: IDataService<EmploymentRecord>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
