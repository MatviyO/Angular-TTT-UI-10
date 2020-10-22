import { Injectable, Injector } from '@angular/core';
import {BaseDataService} from '../../../common/services';
import {OrientationEvent} from '../../../core/model';


@Injectable()
export class OrientationEventService extends BaseDataService<OrientationEvent> {

    constructor(injector: Injector) {
        super(injector, 'api/OrientationEvents');
    }
}
