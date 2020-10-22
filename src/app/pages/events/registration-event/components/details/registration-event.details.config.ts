import { Injectable, Inject, Injector } from '@angular/core';
import { RegistrationEventService } from '../../registration-event.service';
import {RegistrationEvent} from '../../../../../core/model';
import {IDataService, IEditorStatefulConfig} from '../../../../../common/interfaces';


@Injectable()
export class RegistrationEventDetailsConfig implements IEditorStatefulConfig<RegistrationEvent> {
    navigationTitle  = 'Registration Event';
    navigationUrlPrefix = 'events/registration-event';
    cls: new () => any = RegistrationEvent;
    componentTitle = 'Registration Event';

    constructor(
        @Inject(RegistrationEventService) public dataSvc: IDataService<RegistrationEvent>,
        public injector: Injector,
    ) { }
}
