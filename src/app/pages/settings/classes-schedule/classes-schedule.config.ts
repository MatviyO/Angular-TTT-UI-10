import { Injectable, Inject, Injector } from '@angular/core';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {ScheduledClass} from '../../../core/model';
import {ClassesService} from '../../../core/data';

@Injectable()
export class ClassesScheduleConfig implements IEditorConfig<ScheduledClass> {
    cls: new () => any = ScheduledClass;
    componentTitle = 'Classes schedule';

    constructor(
        @Inject(ClassesService) public dataSvc: IDataService<ScheduledClass>,
        public injector: Injector,
    ) { }
}
