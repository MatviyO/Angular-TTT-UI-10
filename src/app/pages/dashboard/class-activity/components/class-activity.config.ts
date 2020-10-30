import { Injectable, Inject, Injector } from '@angular/core';
import {ClassAvtivityService} from './class-activity.service';
import {LogItem} from '../../../../core/model/properties/class-activity';
import {IDataService, IEditorConfig} from '../../../../common/interfaces';



@Injectable()
export class ClassActivityConfig implements IEditorConfig<LogItem> {
    cls: new () => any = LogItem;
    componentTitle = 'Class activity';
    includes = 'Subject';

    constructor(
        @Inject(ClassAvtivityService) public dataSvc: IDataService<LogItem>,
        public injector: Injector,

    ) { }
}
