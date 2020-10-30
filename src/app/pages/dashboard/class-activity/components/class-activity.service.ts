import { Injectable, Injector } from '@angular/core';
import {LogItem} from '../../../../core/model/properties/class-activity';
import {BaseDataService} from '../../../../common/services';

@Injectable()
export class ClassAvtivityService extends BaseDataService<LogItem> {

    constructor(injector: Injector) {
        super(injector, 'api/TransactionLogs', 'subject.type=="3" or isUserProvided=true');
    }
}
