import { Injectable, Injector } from '@angular/core';
import {BaseDataService} from '../../common/services';
import {CommunicationHistory} from '../model';




@Injectable()
export class ApplicationNoteService extends BaseDataService<CommunicationHistory> {
  constructor(injector: Injector) {
      super(injector, 'api/ApplicaitonCommunicationHistory');
  }
}
