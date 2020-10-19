import {Injectable, Injector} from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {MilitaryBase} from '../../../core/model/properties';

@Injectable()
export class MilitaryBaseService extends BaseDataServiceUnDeletable<MilitaryBase> {
  constructor(injector: Injector) {
    super(injector, 'api/MilitaryBases');
  }
}
