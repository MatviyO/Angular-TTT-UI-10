import {Injectable, Injector} from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {InterviewOutcome} from '../../../core/model/properties';

@Injectable()
export class InterviewOutcomeService extends BaseDataServiceUnDeletable<InterviewOutcome>{

  constructor(injector: Injector) {
    super( injector, 'api/InterviewOutcomes');
  }
}
