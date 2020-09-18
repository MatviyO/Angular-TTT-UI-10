
import { Company, AlternativeLocation, EmploymentStatus, InterviewStage, NonPlacementReason, InterviewOutcome } from './';
import {BaseAddressUnDeletable, BaseEntity, BaseEntityWithApplRef, BaseNotes} from '../../common/entities';


export class EmploymentSchooling extends BaseAddressUnDeletable {
    employmentHistoryId: number;
    programName: string;
}


export class EmploymentHistory extends BaseEntityWithApplRef {
    companies: EmploymentCompany[];
    isPlaced: boolean;
    isPlacedInFields: boolean;
    nonPlacementReason: NonPlacementReason;
    nonPlacementReasonId: number;
    employmentBeforeSchool: EmploymentBeforeSchool;
    hasTrigger?: boolean = false;
    schooling: EmploymentSchooling;
    constructor() {
        super();
        this.companies = [];
    }
}

export class EmploymentCompany extends BaseEntity {
    employmentHistoryId: number;
    employmentHistory: EmploymentHistory;
    companyId: number;
    company: Company;
    trade: number;
    interviewOutcomeId: number;
    interviewOutcome: InterviewOutcome;
    lastEmploymentStage: any;
    lastInterviewStage: any;
    // isHired: boolean;

    employmentStages: EmploymentStage[];
    interviewStages: InterviewStage[];

    constructor() {
        super();
        this.employmentStages = [];
        this.interviewStages = [];
    }
}

export class EmploymentBeforeSchool extends BaseAddressUnDeletable {
    name: string;
    phone: string;
    employmentHistoryId: number;
}

export class EmploymentStage extends BaseEntity {
    employmentCompany: EmploymentCompany;
    employmentCompanyId: number;
    date: any;
    statusId: number;
    status: EmploymentStatus;
    locationId?: number;
    location?: AlternativeLocation;
    title: string;
    wage: number;
    notes: EmploymentNote[];
    index: number;

    // constructor () {
    //     super();
    //     this.notes = [];
    // }

    constructor(stage?: EmploymentStage) {
        super();
        this.notes = [];
        this.date = new Date();
        if (stage) {
            this.employmentCompanyId = stage.employmentCompanyId;
            this.locationId = stage.locationId;
            this.statusId = stage.statusId;
            if (stage.status) {
                this.status = stage.status;
            }
            this.notes = stage.notes;
            this.title = stage.title;
            this.wage = stage.wage;
        }
    }
}

export class EmploymentNote extends BaseNotes {
    employmentStageId: number;
    // timeStamp: Date;
    note: string;
}
