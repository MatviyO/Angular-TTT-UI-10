import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from '@ttt/common';
import { OrientationEvent } from 'app/core';

@Injectable()
export class OrientationEventService extends BaseDataService<OrientationEvent> {

    constructor(injector: Injector) {
        super(injector, 'api/OrientationEvents');
    }
}
