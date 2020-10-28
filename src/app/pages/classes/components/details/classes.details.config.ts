import { Injectable, Inject, Injector } from '@angular/core';
import {StudentGraduation} from '../../../../core/model';
import {IDataService, IEditorStatefulWithTriggersConfig, ITriggerHelper, ITriggerService} from '../../../../common/interfaces';
import {StudentGraduationService, TriggerHelper, TriggerService} from '../../../../core/data';


@Injectable()
export class ClassesDetailsConfig implements IEditorStatefulWithTriggersConfig<StudentGraduation> {
    navigationTitle  = 'Graduations';
    navigationUrlPrefix  = 'classes';
    cls: new () => any = StudentGraduation;
    triggerCategory = 'Graduation';
    componentTitle = 'Classes';

    constructor(
        @Inject(StudentGraduationService) public dataSvc: IDataService<StudentGraduation>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
