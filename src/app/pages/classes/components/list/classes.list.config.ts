import { Injectable, Inject, Injector } from '@angular/core';
import {IDataService, IListWithTriggersConfig, ITriggerService} from '../../../../common/interfaces';
import {StudentGraduation} from '../../../../core/model';
import {StudentGraduationService, TriggerService} from '../../../../core/data';


@Injectable()
export class ClassesListConfig implements IListWithTriggersConfig<StudentGraduation> {
    triggerType = 'Classes';
    cls: new () => any = StudentGraduation;
    componentTitle = 'Classes';
    includes = 'Application.AllClasses,GraduationExpectedDate,GraduationLocation';
    selectJSONPath = 'id;hasCompletedClasses;isAttendingGraduation;graduationExpectedDate.date;graduationLocationId;graduationLocation.name;application.firstName;application.lastName;application.isActive';

    constructor(
        @Inject(StudentGraduationService) public dataSvc: IDataService<StudentGraduation>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        public injector: Injector,
    ) { }
}
