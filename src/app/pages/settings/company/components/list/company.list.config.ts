import { Injectable, Inject, Injector } from '@angular/core';
import {Company} from '../../../../../core/model';
import {IComponentConfig, IDataService} from '../../../../../common/interfaces';
import {CompanyService} from '../../../../../core/data';


@Injectable()
export class CompanyListConfig implements IComponentConfig<Company> {
    cls: new() => any = Company;
    componentTitle = 'Company';
    includes = 'Trades;Affiliate';
  selectJSONPath = 'id;isActive;name;country;state;city;address;otherTrades;trades[*].trade;trades[*].isActive;trades[*].name;affiliate.description';

    constructor(
        @Inject(CompanyService) public dataSvc: IDataService<Company>,
        public injector: Injector,
    ) { }
}
