import { Injectable, Inject, Injector } from '@angular/core';
import { IEditorWithTriggersConfig, ITriggerService, IDataService, ITriggerHelper } from '@ttt/common/interfaces';
import { HousingAllowance, HousingAllowanceService, TriggerService, TriggerHelper } from '@ttt/core';

@Injectable()
export class HousingAllowanceDetailsConfig implements IEditorWithTriggersConfig<HousingAllowance> {
    cls: { new (): any } = HousingAllowance;
    triggerCategory: string = 'HousingAllowance';
    componentTitle: string = 'Housing allowance';

    constructor(
        @Inject(HousingAllowanceService) public dataSvc: IDataService<HousingAllowance>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,        
        public injector: Injector,
    ) { }
}
