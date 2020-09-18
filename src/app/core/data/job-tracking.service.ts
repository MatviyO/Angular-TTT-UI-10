import { Injectable, Injector } from '@angular/core';
import {EmploymentBeforeSchool, EmploymentCompany, EmploymentHistory, EmploymentStage} from '../model';
import {BaseDataService} from '../../common/services';


// import { EmploymentCompany } from '../model';

@Injectable()
export class EmploymentService extends BaseDataService<EmploymentHistory> {

    constructor(injector: Injector) {
        super(injector, 'api/EmploymentHistory', '(application.type=="3" or application.type=="2")');
    }

}

@Injectable()
export class EmploymentCompanyService extends BaseDataService<EmploymentCompany> {

    constructor(injector: Injector) {
        super(injector, 'api/EmploymentCompanies');
    }
}
@Injectable()
export class EmploymentStageService extends BaseDataService<EmploymentStage> {

    constructor(injector: Injector) {
        super(injector, 'api/EmploymentStages');
    }

}

@Injectable()
export class EmploymentBSchoolService extends BaseDataService<EmploymentBeforeSchool> {

    constructor(injector: Injector) {
        super(injector, 'api/EmploymentBeforeSchool');
    }

}

