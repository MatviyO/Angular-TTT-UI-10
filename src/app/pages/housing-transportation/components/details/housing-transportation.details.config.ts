import { Injectable, Inject, Injector } from '@angular/core';
import {HousingtranportationService, TriggerHelper, TriggerService} from '../../../../core/data';
import {IDataService, IEditorStatefulWithTriggersConfig, ITriggerHelper, ITriggerService} from '../../../../common/interfaces';
import {HousingTransportation} from '../../../../core/model/housing-transportation';


@Injectable()
export class HousingTransportationDetailsConfig implements IEditorStatefulWithTriggersConfig<HousingTransportation> {
    triggerCategory = 'Housing';
    navigationTitle = 'Housing Transportation';
    navigationUrlPrefix = 'housing-transportation';
    cls: new () => any = HousingTransportation;
    componentTitle = 'Housing Transportation';
    includes = 'ClassParticipant, HousingOption';

    constructor(
        @Inject(HousingtranportationService) public dataSvc: IDataService<HousingTransportation>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
