import { Injectable, Inject, Injector } from '@angular/core';
import {HousingAllowanceService, TriggerHelper, TriggerService} from '../../../../core/data';
import {IDataService, IEditorWithTriggersConfig, ITriggerHelper, ITriggerService} from '../../../../common/interfaces';
import {HousingAllowance} from '../../../../core/model';


@Injectable()
export class HousingAllowanceDetailsConfig implements IEditorWithTriggersConfig<HousingAllowance> {
    cls: new () => any = HousingAllowance;
    triggerCategory = 'HousingAllowance';
    componentTitle = 'Housing allowance';

    constructor(
        @Inject(HousingAllowanceService) public dataSvc: IDataService<HousingAllowance>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
