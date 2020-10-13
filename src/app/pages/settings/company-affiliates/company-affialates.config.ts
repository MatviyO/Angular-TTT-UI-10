import {Inject, Injectable, Injector} from '@angular/core';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {CompanyAffiliate} from '../../../core/model/properties';
import {CompanyAffiliatesService} from '../../../core/data';

@Injectable()

export class CompanyAffialatesConfig implements IEditorConfig<CompanyAffiliate> {
  cls: new() =>  any = CompanyAffiliate ;
  componentTitle = 'Company affiliate';
  includes = 'null';

  constructor(
    @Inject(CompanyAffiliatesService) public dataSvc: IDataService<CompanyAffiliate>,
    public injector: Injector,
  ) {}
}
