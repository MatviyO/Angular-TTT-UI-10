import { Injectable, Inject, Injector } from '@angular/core';
import {IDataService, IListWithTriggersConfig, ITriggerService} from '../../../../common/interfaces';
import {RideAlong} from '../../../../core/model';
import {RideAlongService, TriggerService} from '../../../../core/data';


@Injectable()
export class RideAlongListConfig implements IListWithTriggersConfig<RideAlong> {
    triggerType  = 'RideAlongs';
    cls: new() => any = RideAlong;
    componentTitle = 'Ride along';
    includes = 'Application';
    selectJSONPath = 'id;status;feedbackId;officeLocationId;application.firstName;application.lastName;application.isActive';

    constructor(
        @Inject(RideAlongService) public dataSvc: IDataService<RideAlong>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        public injector: Injector,
    ) { }
}
