import { Injectable, Inject, Injector } from '@angular/core';
import { IEditorStatefulConfig, IDataService } from '@ttt/common/interfaces';
import { RegistrationEventService } from '../../registration-event.service';
import { RegistrationEvent } from 'app/core';


@Injectable()
export class RegistrationEventDetailsConfig implements IEditorStatefulConfig<RegistrationEvent> {
    navigationTitle: string = 'Registration Event';
    navigationUrlPrefix: string = 'events/registration-event';
    cls: { new (): any } = RegistrationEvent;
    componentTitle = 'Registration Event';

    constructor(
        @Inject(RegistrationEventService) public dataSvc: IDataService<RegistrationEvent>,
        public injector: Injector,
    ) { }
}
