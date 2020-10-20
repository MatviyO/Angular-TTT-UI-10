import {Injectable, Injector} from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';

@Injectable()
export class FeedbacksService extends BaseDataServiceUnDeletable<any> {

  constructor(injector: Injector) {
    super(injector, 'api/feedbacks');
  }
}
