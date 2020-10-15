import { Injectable, Injector } from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../../../../../common/services';
import {CompanyContacts} from '../../../../../../../core/model/properties';



@Injectable()
export class CompanyContactsService extends BaseDataServiceUnDeletable<CompanyContacts> {

    constructor(injector: Injector) {
        super(injector, 'api/CompanyContacts');
    }
}
