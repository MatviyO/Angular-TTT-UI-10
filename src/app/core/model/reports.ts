import {BaseEntity} from '../../common/entities';


export class JobReport extends BaseEntity {
  companyAddress: string;
  companyCity: string;
  companyCountry: string;
  companyName: string;
  companyState: string;
  companyZip: string;
  dateOfBirth: string | Date;
  firstName: string;
  lastName: string;
  ssnPart: string;
}

export class EmploymentReport extends JobReport {
  startDate: string | Date;
  tenure: number;
  title: string;
  wage: number;
}

export class InterviewReport extends JobReport {
  companyPhone: string;
  companySource: string;
  date: string | Date;
  outcome: string;
}
