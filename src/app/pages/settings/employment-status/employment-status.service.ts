import {Injectable, Injector} from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {EmploymentStatus} from '../../../core/model/properties';

@Injectable()
export class EmploymentStatusService extends BaseDataServiceUnDeletable<EmploymentStatus> {

  constructor(injector: Injector) {
    super(injector, 'api/EmploymentStatuses');
  }

}
