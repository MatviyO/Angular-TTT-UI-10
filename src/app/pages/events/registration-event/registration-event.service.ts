import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from '@ttt/common';
import { RegistrationEvent } from 'app/core/model/registration-event';

@Injectable()
export class RegistrationEventService extends BaseDataService<RegistrationEvent> {

    constructor(injector: Injector) {
        super(injector, 'api/RegistrationEvents');
    }
}
