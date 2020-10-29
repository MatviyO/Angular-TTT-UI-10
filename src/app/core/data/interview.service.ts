import { Injectable, Injector } from '@angular/core';
import { Interview } from '../model';
import {BaseDataService} from '../../common/services';

@Injectable()
export class InterviewService extends BaseDataService<Interview> {
  constructor(injector: Injector) {
    super(injector, 'api/JobTracking', '(Stages.Any(recordType == "InterviewStage" )) and (application.type=="3" or application.type=="2") ');
  }

}
