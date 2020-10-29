import { Injectable, Inject, Injector } from '@angular/core';
import {InterviewService, TriggerService} from '../../../../core/data';
import {IComponentConfig, IDataService, ITriggerService} from '../../../../common/interfaces';
import {Interview} from '../../../../core/model';


@Injectable()
export class InterviewsListConfig implements IComponentConfig<Interview> {
    cls: new () => Interview = Interview;
    componentTitle = 'Interview';
    triggerType = 'Interview';
    includes = 'Application,Stages.InterviewOutcome,Stages.Status,Stages.Notes,Stages.Location,CompanyTrade.Company.Trades,CompanyTrade.Company.Contacts,CompanyTrade.Company.AlternateLocations';

    constructor(
        @Inject(InterviewService) public dataSvc: IDataService<Interview>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        public injector: Injector,
    ) { }
}

