import { Injectable, Inject, Injector } from '@angular/core';
import { IDataService, IComponentConfig } from '@ttt/common/interfaces';
import { RegistrationEventService } from '../../registration-event.service';
import { RegistrationEvent } from 'app/core';

@Injectable()
export class RegistrationEventListConfig implements IComponentConfig<RegistrationEvent> {
    componentTitle = 'Registration event';
    includes = 'Attendees';
    selectJSONPath = 'registrationAllowed;id;baseId;date;attendees[*]';
    
    constructor(
        @Inject(RegistrationEventService) public dataSvc: IDataService<RegistrationEvent>,
        public injector: Injector,
      
    ) { }
}
