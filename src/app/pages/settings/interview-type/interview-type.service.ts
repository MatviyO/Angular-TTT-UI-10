import {Injectable, Injector} from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {InterviewType} from '../../../core/model/properties';

@Injectable()
export class InterviewTypeService extends BaseDataServiceUnDeletable<InterviewType>{
  constructor(injector: Injector) {
    super( injector, 'api/InterviewTypes');
  }
}
