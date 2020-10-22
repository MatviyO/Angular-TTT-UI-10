import { Injectable, Inject, Injector } from '@angular/core';
import { OrientationEventService } from '../../orientation-event.service';
import {IDataService, IEditorStatefulConfig} from '../../../../../common/interfaces';
import {OrientationEvent} from '../../../../../core/model';

@Injectable()
export class OrientationEventDetailsConfig implements IEditorStatefulConfig<OrientationEvent> {
    navigationTitle = 'Orientation Event';
    navigationUrlPrefix = 'events/orientation-event';
    cls: new () => OrientationEvent = OrientationEvent;
    componentTitle = 'Orientation Event';

    constructor(
        @Inject(OrientationEventService) public dataSvc: IDataService<OrientationEvent>,
        public injector: Injector,
    ) { }
}
