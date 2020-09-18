import { Injectable, Injector } from '@angular/core';
import {BaseDataService} from '../../common/services';
import {Tools} from '../model';

@Injectable()
export class ToolsService extends BaseDataService<Tools> {

    constructor(injector: Injector) {
        super(injector, 'api/ToolsOrders');
    }
}
