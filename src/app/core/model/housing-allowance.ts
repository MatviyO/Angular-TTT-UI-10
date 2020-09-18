
import { EmploymentCompany } from './job-tracking-stage';
import {BaseEntity} from '../../common/entities';

export class HousingAllowance extends BaseEntity {
    startDate: Date;
    terminationDate: Date;
    applicationDate: Date;
    items: HousingAllowanceItem[];
    employmentCompany: EmploymentCompany;
    employmentCompanyId: number;

    constructor() {
        super();
        this.items = [];
    }
}

export class HousingAllowanceItem extends BaseEntity {
    housingAllowanceId: number;
    period: number;
    paperworkReceivedDate: Date;
    paperworkSubmittedDate: Date;
    hours: number;
    payrate: number;
    editing?: boolean;
}
