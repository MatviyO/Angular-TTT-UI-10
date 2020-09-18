import { Injectable, Injector } from '@angular/core';


import {} from '../model';
import {ResourceServiceBase} from '../../common/services';

@Injectable()
export class ProgramStatsService extends ResourceServiceBase<any> {

    constructor(protected injector: Injector) {
        super(injector, 'api/reports/ProgramStats', [], 0);
    }
}
