import { Injectable, Inject, Injector } from '@angular/core';
import {IDataService, IListWithTriggersConfig, ITriggerService} from '../../../../common/interfaces';
import {ToolsService, TriggerService} from '../../../../core/data';
import {Tools} from '../../../../core/model';

@Injectable()
export class ToolsListConfig implements IListWithTriggersConfig<Tools> {
    triggerType = 'Tools';
    componentTitle = 'Tools';
    includes = 'Application';
    selectJSONPath = 'id;poNumber;invoiceNumber;lastDateSetValue;lastDateSet;checkNumber;application.firstName;application.lastName;application.isActive';

    constructor(
        @Inject(ToolsService) public dataSvc: IDataService<Tools>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        public injector: Injector,
    ) { }
}
