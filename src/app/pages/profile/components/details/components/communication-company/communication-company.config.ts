import { Injectable, Inject, Injector } from '@angular/core';
import { CommunicationHistoryService } from './communication-company.service';
import {IDataService, IEditorConfig} from '../../../../../../common/interfaces';
import {CompanyCommunicationHistory} from '../../../../../../core/model/properties';

@Injectable()
export class CommunicationCompanyConfig implements IEditorConfig<CompanyCommunicationHistory> {
    cls: new () => any = CompanyCommunicationHistory;
    componentTitle = 'Communication company';

    constructor(
        @Inject(CommunicationHistoryService) public dataSvc: IDataService<CompanyCommunicationHistory>,
        public injector: Injector,
    ) { }
}
