import { Injectable, Inject, Injector } from '@angular/core';

import { CompanyContactsService } from './contacts.service';
import {IDataService, IEditorConfig} from '../../../../../../../common/interfaces';
import {CompanyContacts} from '../../../../../../../core/model/properties';

@Injectable()
export class CompanyContactsConfig implements IEditorConfig<CompanyContacts> {
    cls: new () => any = CompanyContacts;
    componentTitle = 'Company contacts';

    constructor(
        @Inject(CompanyContactsService) public dataSvc: IDataService<CompanyContacts>,
        public injector: Injector,
    ) { }
}
