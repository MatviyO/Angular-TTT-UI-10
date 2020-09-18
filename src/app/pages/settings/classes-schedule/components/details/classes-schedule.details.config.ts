import { Injectable, Inject, Injector } from '@angular/core';
import {IDataService, IEditorStatefulConfig} from '../../../../../common/interfaces';
import {ScheduledClass} from '../../../../../core/model';
import {ClassesService} from '../../../../../core/data';

@Injectable()
export class ClassesScheduleDetailsConfig implements IEditorStatefulConfig<ScheduledClass> {
    navigationTitle = 'Sched. Class';
    navigationUrlPrefix = 'settings/classes-schedule';
    cls = ScheduledClass;
    componentTitle = 'Scheduled Class';

    constructor(
        @Inject(ClassesService) public dataSvc: IDataService<ScheduledClass>,
        public injector: Injector,
    ) { }
}
