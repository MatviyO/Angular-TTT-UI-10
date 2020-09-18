
import {
  Profile,
  Company,
  CompanyContacts,
  InterviewType,
  EmploymentHistory,
  EmploymentCompany,
  InterviewOutcome,
  AlternativeLocation
} from './';
import {BaseEntity, BaseNotes} from '../../common/entities';


export class Interview extends BaseEntity {
    companyId: number;
    company?: Company;
    employmentId: number;
    employment?: EmploymentHistory;
    applicationId: number;
    application?: Profile;
    trade: number;
    isHired: boolean;
    outcomeId: number;
    outcome?: InterviewOutcome;
    stages: InterviewStage[];
    lastInterviewStage: InterviewStage;
    hasTrigger = false;

    constructor() {
        super();
        this.stages = [];
    }
}

export class InterviewStage extends BaseEntity {
    employmentCompanyId: number;
    employmentCompany: EmploymentCompany;
    date: Date;
    typeId: number;
    type: InterviewType;
    locationId: number;
    location?: AlternativeLocation;
    contactId: number;
    contact: CompanyContacts;
    notes: InterviewNote[];
    index: number;


    // interviewId: number;
    // previousStageId: number;
    // previousStage: InterviewStage;
    // status: number;
    // interviewTypeId: number;
    // interviewType: InterviewType;
    // hasTrigger?: boolean = false;

    constructor() {
        super();
        this.notes = [];
        this.date = new Date();
    }
}

export class InterviewNote extends BaseNotes {
    interviewStageId: number;
    // timeStamp: string ;
    note: string;
    // edit?: boolean;
}

export class InterviewStatusDto {
    status: string;
    date: Date;
    statusFormatted: string;
}
