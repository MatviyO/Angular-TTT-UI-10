import { Injectable, Inject, Injector } from '@angular/core';
import {IDataService, IListWithTriggersConfig, ITriggerService} from '../../../../common/interfaces';
import {HousingAllowanceService, TriggerService} from '../../../../core/data';
import {HousingAllowance} from '../../../../core/model';


@Injectable()
export class HousingAllowanceListConfig implements IListWithTriggersConfig<HousingAllowance> {
  triggerType = 'HousingAllowance';
  componentTitle = 'Housing allowance';
  includes = 'Items,EmploymentRecord.Application,EmploymentRecord.CompanyTrade';
  selectJSONPath = 'employmentRecordId;items[*].hours;startDate;employmentRecord.companyTrade.*;employmentRecord.companyTradeId;employmentRecord.application.isActive;employmentRecord.application.firstName;employmentRecord.application.lastName';

  constructor(
    @Inject(HousingAllowanceService) public dataSvc: IDataService<HousingAllowance>,
    @Inject(TriggerService) public triggersSvc: ITriggerService,
    public injector: Injector,
  ) { }
}
