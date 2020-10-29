import { Injectable, Injector } from '@angular/core';
import {EmploymentRecord, EmploymentStageV2, InterviewStageV2, JobStage, JobStageNote, NonEmploymentStage} from '../model';
import {BaseDataService} from '../../common/services';


@Injectable()
export class CompanyEmploymentService extends BaseDataService<EmploymentRecord> {
  constructor(injector: Injector) {
    super(injector, 'api/JobTracking');
  }
}

@Injectable()
export class EmploymentService extends BaseDataService<EmploymentRecord> {
  constructor(injector: Injector) {
    super(injector, 'api/JobTracking', '(Stages.Any(recordType == "InterviewStage" ) or Stages.Any(recordType == "EmploymentStage" ) or Stages.Any(recordType == "NonEmploymentStage" )) and (application.type=="3" or application.type=="2") ');
  }
}

@Injectable()
export class JobTrackingService extends BaseDataService<JobStage | JobStageNote> {

  constructor(injector: Injector) {
    super(injector, 'api/JobTracking', '(Stages.Any(recordType == "EmploymentStage") or Stages.Any(recordType == "NonEmploymentStage" )) and (application.type=="3" or application.type=="2") ');
  }


  createInterviewStage(userId: number, obj: InterviewStageV2): Promise<InterviewStageV2> {
    const url = `${this.url}/${userId}/Stages/Interviews`;
    return super.create(obj, url).then((res: InterviewStageV2) => res);
  }

  updateInterviewStage(userId: number, obj: InterviewStageV2): Promise<InterviewStageV2> {
    const url = `${this.url}/${userId}/Stages/Interviews`;
    return super.update(obj, url).then((res: InterviewStageV2) => res);
  }

  deleteInterviewStage(userId: number, obj: InterviewStageV2): Promise<InterviewStageV2> {
    const url = `${this.url}/${userId}/Stages/`;
    return super.delete(obj, url).then((res: InterviewStageV2) => res);
  }

  createEmploymentStage(userId: number, obj: EmploymentStageV2): Promise<EmploymentStageV2> {
    const url = `${this.url}/${userId}/Stages/Employments`;
    return super.create(obj, url).then((res: EmploymentStageV2) => res);
  }

  deleteEmploymentStage(userId: number, obj: EmploymentStageV2): Promise<EmploymentStageV2> {
    const url = `${this.url}/${userId}/Stages`;
    return super.delete(obj, url).then((res: EmploymentStageV2) => res);
  }

  updateEmploymentStage(userId: number, obj: EmploymentStageV2): Promise<EmploymentStageV2> {
    const url = `${this.url}/${userId}/Stages/Employments`;
    return super.update(obj, url).then((res: EmploymentStageV2) => res);
  }

  createNonEmploymentStage(userId: number, obj: NonEmploymentStage): Promise<NonEmploymentStage> {
    const url = `${this.url}/${userId}/Stages/NonEmployments`;
    return super.create(obj, url).then((res: NonEmploymentStage) => res);
  }

  updateNonEmploymentStage(userId: number, obj: NonEmploymentStage): Promise<NonEmploymentStage> {
    const url = `${this.url}/${userId}/Stages/NonEmployments`;
    return super.update(obj, url).then((res: NonEmploymentStage) => res);
  }

  createStageNote(userId: number, note: JobStageNote): Promise<JobStageNote> {
    const url = `${this.url}/${userId}/Stages/Notes`;
    return super.create(note, url).then((res: JobStageNote) => res);
  }

  updateStageNote(userId: number, note: JobStageNote): Promise<JobStageNote> {
    const url = `${this.url}/${userId}/Stages/Notes`;
    return super.update(note, url).then((res: JobStageNote) => res);
  }

  deleteStageNote(userId: number, note: JobStageNote): Promise<JobStageNote> {
    const url = `${this.url}/${userId}/Stages/Notes`;
    return super.delete(note, url).then((res: JobStageNote) => res);
  }

}

