

import { Company, AlternativeLocation, EmploymentStatus, InterviewStage, NonPlacementReason, InterviewOutcome, CompanyTrade } from './';
import { CompanyContacts, InterviewType } from './properties';
import {BaseAddressUnDeletable, BaseEntity, BaseEntityWithApplRef, BaseNotes} from '../../common/entities';


export class JobStage extends BaseEntity {
  recordType: string;
  jobRecordId: number;
  // jobRecord: JobRecord;
  date: string;
  index: number;
  notes: JobStageNote[];
  locationId: number;
  location: AlternativeLocation;
}

export class InterviewStageV2 extends JobStage {
  interviewOutcomeId: number;
  interviewOutcome: InterviewOutcome;
  typeId: number;
  type: InterviewType;
  contactId: number;
  contact: CompanyContacts;
  companytradeid?: number;
  statusId?: number;
  status?: EmploymentStatus;
  constructor() {
    super();
    this.notes = [];
  }

}

export class AddInterviewStageDto extends InterviewStageV2 {
  companyTradeId: number;
  companyTrade: CompanyTrade;
}

export class InterviewRecord extends BaseEntityWithApplRef {
  companyTradeId: number;
  companyTrade: CompanyTrade;
  recordType: string;
  startDate: string;
  endDate: string;
  stages: InterviewStageV2[];
}


export class EmploymentRecord extends BaseEntityWithApplRef {
  recordType: string;
  startDate: string;
  endDate: string;
  stages: EmploymentStageV2[];
  jobRecordId: number;

  companyTradeId: number;
  companytradeid: number;
  companyTrade: CompanyTrade;

  open?: boolean;
  duration?: number;
}

export class EmploymentStageV2 extends JobStage {
  statusId: number;
  status: EmploymentStatus;
  title: string;
  wage: number;
  companytradeid?: number;
  note?: string;
  interviewOutcomeId?: number;
  lastStageDate?: Date | string;

}

export class NonEmploymentStage extends EmploymentStageV2 {
  nonPlacementReasonId: number;
  nonPlacementReason?: EmploymentNonPlacementReason;
  schoolingProgramName: string;
  schoolingLocationName: string;
  schoolingAddress: string;
  schoolingCity: string;
  schoolingState: string;
  schoolingZip: string;
  schoolingCountry: string;
}

export class JobStageNote extends BaseEntity {
  text: string;
  stageId: number;
  index?: number;
}

export class EmploymentNonPlacementReason extends BaseEntity {
  description: string;
  isActive: boolean;
  type: number;
  slsdCode: string;
}


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
  hasTrigger? = false;
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
