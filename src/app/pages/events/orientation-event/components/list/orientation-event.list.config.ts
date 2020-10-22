import { Injectable, Inject, Injector } from '@angular/core';
import { OrientationEventService } from '../../orientation-event.service';
import {IComponentConfig, IDataService} from '../../../../../common/interfaces';
import {OrientationEvent} from '../../../../../core/model';

@Injectable()
export class OrientationEventListConfig implements IComponentConfig<OrientationEvent> {
    componentTitle = 'Orientation event';
    includes = 'Attendees';
    selectJSONPath = 'registrationAllowed;id;baseId;date;attendees[*]';

    constructor(
        @Inject(OrientationEventService) public dataSvc: IDataService<OrientationEvent>,
        public injector: Injector,

    ) { }
}
