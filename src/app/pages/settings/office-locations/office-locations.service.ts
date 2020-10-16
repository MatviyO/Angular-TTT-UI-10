import { Injectable, Injector } from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {OfficeLocation} from '../../../core/model/properties';


@Injectable()
export class OfficeLocationService extends BaseDataServiceUnDeletable<OfficeLocation> {

  constructor(injector: Injector) {
    super(injector, 'api/officelocations');
  }

}
