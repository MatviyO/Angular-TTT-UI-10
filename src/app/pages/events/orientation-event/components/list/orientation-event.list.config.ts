import { Injectable, Inject, Injector } from '@angular/core';
import { IDataService, IComponentConfig } from '@ttt/common/interfaces';
import { OrientationEvent } from 'app/core';
import { OrientationEventService } from '../../orientation-event.service';

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
