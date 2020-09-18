import { Injectable, Injector } from '@angular/core';
import {BaseDataService} from '../../common/services';
import {Company} from '../model';

@Injectable()
export class CompanyService extends BaseDataService<Company> {
    constructor(injector: Injector) {
        super(injector, 'api/Companies');
    }
}
