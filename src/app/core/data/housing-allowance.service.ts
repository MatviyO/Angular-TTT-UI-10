import { Injectable, Injector } from '@angular/core';
import {BaseDataService} from '../../common/services';
import {HousingAllowance} from '../model';


@Injectable()
export class HousingAllowanceService extends BaseDataService<HousingAllowance> {

  constructor(injector: Injector) {
    super(injector, 'api/HousingAllowance');
  }
}
