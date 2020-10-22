import { Injectable, Inject, Injector } from '@angular/core';
import { IEditorStatefulConfig, IDataService } from '@ttt/common/interfaces';
import { OrientationEventService } from '../../orientation-event.service';
import { OrientationEvent } from 'app/core';


@Injectable()
export class OrientationEventDetailsConfig implements IEditorStatefulConfig<OrientationEvent> {
    navigationTitle: string = 'Orientation Event';
    navigationUrlPrefix: string = 'events/orientation-event';
    cls: { new (): OrientationEvent } = OrientationEvent;
    componentTitle = 'Orientation Event';

    constructor(
        @Inject(OrientationEventService) public dataSvc: IDataService<OrientationEvent>,
        public injector: Injector,
    ) { }
}
