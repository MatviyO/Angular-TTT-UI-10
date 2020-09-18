import { Injectable, Injector } from '@angular/core';

import { Affiliation } from '../model/properties/application-affiliation';
import {BaseDataService} from '../../common/services';

@Injectable()
export class ApplicationAffiliationService extends BaseDataService<Affiliation> {
  constructor(injector: Injector) {
      super(injector, 'api/ApplicationAffiliations');
  }
}
