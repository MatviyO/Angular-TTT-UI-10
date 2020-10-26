import { Injectable, Injector } from '@angular/core';
import {CommunicationHistory} from '../../../../../../core/model';
import {BaseDataService} from '../../../../../../common/services';

@Injectable()
export class ApplicationNoteService extends BaseDataService<CommunicationHistory> {
  constructor(injector: Injector) {
      super(injector, 'api/ApplicaitonCommunicationHistory');
  }
}
