import { Injectable, Injector } from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../../../../../common/services';
import {CompanyCommunicationHistory} from '../../../../../../../core/model/properties';

@Injectable()
export class CommunicationHistoryService extends BaseDataServiceUnDeletable<CompanyCommunicationHistory> {

    constructor(injector: Injector) {
        super(injector, 'api/CompanyCommunicationHistory');
    }
}

