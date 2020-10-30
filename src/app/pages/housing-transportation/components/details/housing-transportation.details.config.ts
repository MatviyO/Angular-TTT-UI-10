import { Injectable, Inject, Injector } from '@angular/core';

import { IEditorStatefulConfig, IDataService, ITriggerService, ITriggerHelper, IEditorStatefulWithTriggersConfig } from '@ttt/common/interfaces';

import { HousingtranportationService, TriggerService, TriggerHelper } from '@ttt/core';
import { HousingTransportation } from 'app/core/model/housing-transportation';

@Injectable()
export class HousingTransportationDetailsConfig implements IEditorStatefulWithTriggersConfig<HousingTransportation> {
    triggerCategory: string = 'Housing';
    navigationTitle: string = 'Housing Transportation';
    navigationUrlPrefix: string = 'housing-transportation';
    cls: { new (): any } = HousingTransportation;
    componentTitle = 'Housing Transportation';
    includes: string = 'ClassParticipant, HousingOption';

    constructor(
        @Inject(HousingtranportationService) public dataSvc: IDataService<HousingTransportation>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
