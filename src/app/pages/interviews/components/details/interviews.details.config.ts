import { Injectable, Inject, Injector } from '@angular/core';
import {InterviewRecord} from '../../../../core/model';
import {IDataService, IEditorStatefulConfig, ITriggerHelper, ITriggerService} from '../../../../common/interfaces';
import {InterviewService, TriggerHelper, TriggerService} from '../../../../core/data';

@Injectable()
export class InterviewsDetailsConfig implements IEditorStatefulConfig<InterviewRecord> {
    navigationTitle = 'Interviews';
    navigationUrlPrefix = 'interviews';
    cls: new () => any = InterviewRecord;
    triggerType = 'Interview';
    componentTitle = 'Interview';

    constructor(
        @Inject(InterviewService) public dataSvc: IDataService<InterviewRecord>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
