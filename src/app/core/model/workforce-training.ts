import {EmploymentCompany} from './job-tracking-stage';
import {BaseEntity} from '../../common/entities';

export class WorkforceTrainingPersonal extends BaseEntity {
    employmentCompany: EmploymentCompany;
    employmentCompanyId: number;
    maxHours: number;
    items: WorkforceTrainingPersonalItem[];

    constructor() {
        super();
        this.items = [];
    }
}

export class WorkforceTrainingPersonalItem extends BaseEntity {
    hillerWorkforceTrainingPersonalId: number;
    year: number;
    month: number;
    totalHours: number;
    wage: number;
    reimbursementAmount: number;
    reseivedDate: Date;
    editing?: boolean;
}

export class WorkforceTrainingCompany extends BaseEntity {
    year: number;
    month: number;
    submitted: Date;
    received: Date;
    checkNumber: string;
    totalHours: number;
    amount: number;
    open?: boolean;

}
