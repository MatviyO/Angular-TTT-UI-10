import { Injectable, Inject, Injector } from '@angular/core';

import { CommunicationHistoryService } from './communication-history.service';
import {IDataService, IEditorConfig} from '../../../../../../../common/interfaces';
import {CompanyCommunicationHistory} from '../../../../../../../core/model/properties';

@Injectable()
export class CompanyCommunicationHistoryConfig implements IEditorConfig<CompanyCommunicationHistory> {
    cls: new () => any = CompanyCommunicationHistory;
    componentTitle = 'Company communication history';

    constructor(
        @Inject(CommunicationHistoryService) public dataSvc: IDataService<CompanyCommunicationHistory>,
        public injector: Injector,
    ) { }
}
