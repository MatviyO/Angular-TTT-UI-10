import {Injectable, Injector} from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {ExitReason} from '../../../core/model/properties';

@Injectable()
export class ExitReasonsService extends BaseDataServiceUnDeletable<ExitReason>{

  constructor(injector: Injector) {
    super(injector, 'api/ApplicationProgramExitReasons');
  }
}
