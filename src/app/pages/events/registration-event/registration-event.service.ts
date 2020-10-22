import { Injectable, Injector } from '@angular/core';
import {RegistrationEvent} from '../../../core/model';
import {BaseDataService} from '../../../common/services';

@Injectable()
export class RegistrationEventService extends BaseDataService<RegistrationEvent> {

    constructor(injector: Injector) {
        super(injector, 'api/RegistrationEvents');
    }
}
