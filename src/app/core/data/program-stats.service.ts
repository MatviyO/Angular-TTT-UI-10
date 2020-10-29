import { Injectable, Injector } from '@angular/core';
import {ResourceServiceBase} from '../../common/services';


@Injectable()
export class ProgramStatsService extends ResourceServiceBase<any> {
  constructor(protected injector: Injector) {
    super(injector, 'api/stats/TTTProgramStats', [], 0);
  }
}
