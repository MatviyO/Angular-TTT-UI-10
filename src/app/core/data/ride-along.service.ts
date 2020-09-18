import { Injectable, Injector } from '@angular/core';
import {RideAlong} from '../model';
import {BaseDataService} from '../../common/services';


@Injectable()
export class RideAlongService extends BaseDataService<RideAlong> {
    constructor(injector: Injector) {
        super(injector, 'api/RideAlongs', 'application.type=="3"');
    }
}
