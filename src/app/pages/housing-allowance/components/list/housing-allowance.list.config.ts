import { Injectable, Inject, Injector } from '@angular/core';
import { IListWithTriggersConfig, ITriggerService, IDataService } from '@ttt/common/interfaces';
import { HousingAllowance, HousingAllowanceService, TriggerService } from '@ttt/core';

@Injectable()
export class HousingAllowanceListConfig implements IListWithTriggersConfig<HousingAllowance> {
    triggerType: string = 'HousingAllowance';
    componentTitle = 'Housing allowance';
    includes = 'Items,EmploymentCompany.EmploymentHistory.Application';
    // tslint:disable-next-line:max-line-length
    selectJSONPath = 'employmentCompanyId;items[*].hours;startDate;employmentCompany.trade;employmentCompany.employmentHistory.application.isActive;employmentCompany.employmentHistory.application.firstName;employmentCompany.employmentHistory.application.lastName';

    constructor(
        @Inject(HousingAllowanceService) public dataSvc: IDataService<HousingAllowance>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        public injector: Injector,
    ) { }
}
