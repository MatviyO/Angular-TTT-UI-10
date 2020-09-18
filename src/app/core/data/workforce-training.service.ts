import { Injectable, Injector } from '@angular/core';
import {WorkforceTrainingCompany, WorkforceTrainingPersonal} from '../model';
import {BaseDataService} from '../../common/services';

@Injectable()
export class WorkforceTrainingPersonalService extends BaseDataService<WorkforceTrainingPersonal> {

    constructor(injector: Injector) {
        super(injector, 'api/WorkforceTrainingPersonal');
    }
}

@Injectable()
export class WorkforceTrainingCompanyService extends BaseDataService<WorkforceTrainingCompany> {

    constructor(injector: Injector) {
        super(injector, 'api/WorkforceTrainingCompany');
    }
}
