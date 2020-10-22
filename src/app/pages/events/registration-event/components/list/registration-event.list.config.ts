import { Injectable, Inject, Injector } from '@angular/core';
import { RegistrationEventService } from '../../registration-event.service';
import {IComponentConfig, IDataService} from '../../../../../common/interfaces';
import {RegistrationEvent} from '../../../../../core/model';

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
