import { Injectable, Inject, Injector } from '@angular/core';
import {ToolsService, TriggerHelper, TriggerService} from '../../../../core/data';
import {Tools} from '../../../../core/model';
import {IDataService, IEditorWithTriggersConfig, ITriggerHelper, ITriggerService} from '../../../../common/interfaces';

@Injectable()
export class ToolsDetailsConfig implements IEditorWithTriggersConfig<Tools> {
    cls: new () => any = Tools;
    triggerCategory = 'Tools';
    componentTitle = 'Tools';

    constructor(
        @Inject(ToolsService) public dataSvc: IDataService<Tools>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
