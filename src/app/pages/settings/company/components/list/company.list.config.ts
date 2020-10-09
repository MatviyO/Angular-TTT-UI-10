import {Inject, Injectable, Injector} from '@angular/core';
import {IComponentConfig, IDataService} from '../../../../../common/interfaces';
import {Company} from '../../../../../core/model';
import {CompanyService} from '../../../../../core/data';

@Injectable()

export class CompanyListConfig implements IComponentConfig<Company> {
  cls: new() => any = Company;
  componentTitle = 'Company';
  includes = 'Trades;Affiliate';
  selectJSONPath = 'id;isActive;name;country;state;city;address;otherTrades;trades[*].trade;trades[*].name;affiliate.description';

  constructor(
    @Inject(CompanyService) public dataSvc: IDataService<Company>,
    public injector: Injector
  ) {}
}
