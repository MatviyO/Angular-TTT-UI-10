import { Injectable, Injector } from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {CompanyAffiliate} from '../../../core/model/properties';



@Injectable()
export class CompanyAffiliatesService extends BaseDataServiceUnDeletable<CompanyAffiliate> {

  constructor(injector: Injector) {
    super(injector, 'api/companyaffiliates');
  }

}
