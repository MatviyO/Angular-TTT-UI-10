import { Injectable, Injector } from '@angular/core';

import { BaseDataService } from '@ttt/common/services';
import { CommunicationHistory } from '@ttt/core/model';

@Injectable()
export class ApplicationNoteService extends BaseDataService<CommunicationHistory> {
  constructor(injector: Injector) {
      super(injector, 'api/ApplicaitonCommunicationHistory');
  }
}
