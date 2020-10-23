import { Injectable, Injector } from '@angular/core';

import { BaseDataServiceUnDeletable } from '@ttt/common';
import { CompanyCommunicationHistory } from '@ttt/core/model';

@Injectable()
export class CommunicationHistoryService extends BaseDataServiceUnDeletable<CompanyCommunicationHistory> {

    constructor(injector: Injector) {
        super(injector, 'api/CompanyCommunicationHistory');
    }
}

