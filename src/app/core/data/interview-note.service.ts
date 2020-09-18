import { Injectable, Injector } from '@angular/core';

import { InterviewType } from '../model';
import {BaseDataService} from '../../common/services';

@Injectable()
export class InterviewNotesService extends BaseDataService<InterviewType> {
    constructor(injector: Injector) {
        super(injector, 'api/InterviewNotes');
    }
}
