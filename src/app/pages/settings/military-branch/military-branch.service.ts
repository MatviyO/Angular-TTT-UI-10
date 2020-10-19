import {Injectable, Injector} from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {MilitaryBranch} from '../../../core/model/properties';

@Injectable()
export class MilitaryBranchService extends BaseDataServiceUnDeletable<MilitaryBranch> {
  constructor(injector: Injector) {
    super(injector, 'api/ApplicationMilitaryBranches');
  }
}
