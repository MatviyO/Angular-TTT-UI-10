import {Injectable, Injector} from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {CallReason} from '../../../core/model/properties';

@Injectable()
export class CallReasonsService extends BaseDataServiceUnDeletable<CallReason>{

  constructor(injector: Injector) {
    super(injector, 'api/CompanyCallReason');
  }
}
