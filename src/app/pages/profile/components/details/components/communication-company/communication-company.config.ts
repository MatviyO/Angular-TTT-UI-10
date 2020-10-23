import { Injectable, Inject, Injector } from '@angular/core';
import { IEditorConfig, IDataService } from '@ttt/common/interfaces';
import { CompanyCommunicationHistory } from '@ttt/core';
import { CommunicationHistoryService } from './communication-company.service';

@Injectable()
export class CommunicationCompanyConfig implements IEditorConfig<CompanyCommunicationHistory> {
    cls: { new (): any } = CompanyCommunicationHistory;
    componentTitle = 'Communication company';

    constructor(
        @Inject(CommunicationHistoryService) public dataSvc: IDataService<CompanyCommunicationHistory>,
        public injector: Injector,
    ) { }
}
