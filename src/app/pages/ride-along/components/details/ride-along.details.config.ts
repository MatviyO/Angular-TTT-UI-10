import { Injectable, Inject, Injector } from '@angular/core';
import {RideAlong} from '../../../../core/model';
import {RideAlongService, TriggerHelper, TriggerService} from '../../../../core/data';
import {IDataService, IEditorStatefulWithTriggersConfig, ITriggerHelper, ITriggerService} from '../../../../common/interfaces';

@Injectable()
export class RideAlongDetailsConfig implements IEditorStatefulWithTriggersConfig<RideAlong> {
    navigationTitle  = 'Ride Along';
    navigationUrlPrefix = 'ride-along';
    cls: new () => any = RideAlong;
    triggerCategory = 'RideAlongs';
    componentTitle = 'Ride along';

    constructor(
        @Inject(RideAlongService) public dataSvc: IDataService<RideAlong>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
