import { Injectable, Injector } from '@angular/core';

import {
    ExitReason, Reference, Graduation, Campus, GraduationLocation,
  // tslint:disable-next-line:max-line-length
    Level, MilitaryBase, Profile, Interview, InterviewType, InterviewOutcome, OfficeLocation, CompanyContacts, CallReason, Feedback, EmploymentStatus,
  // tslint:disable-next-line:max-line-length
    CompanyAffiliate, Company, EmploymentHistory, Tools, HousingAllowance, Mentorship, WorkforceTrainingPersonal, WorkforceTrainingCompany, StudentGraduation,
    CompanyCommunicationHistory, NonPlacementReason, ScheduledClass, OrientationEvent, EmploymentCompany, WithdrawReason, MilitaryBranch,
} from '../model';
import { RegistrationEvent } from '../model/registration-event';
import { Discount } from '../model/properties/discount';
import { LogItem } from '../model/properties/class-activity';
import { ProfileStats } from '../model/properties/profile-stats';
import { AffiliationType } from '../model/properties/application-affiliation';
import {ResourceServiceBase} from '../../common/services';


@Injectable()
export class GraduationDatesService extends ResourceServiceBase<Graduation> {

    constructor(protected injector: Injector) {
        super(injector, 'api/ClassesGraduationDates');
    }

    // query(filter: string = '', order: string = ''): Promise<Graduation[]> {
    //     return super.query(filter, 'date desc');
    // }
}

@Injectable()
export class StudentStatsService extends ResourceServiceBase<any> {

    constructor(protected injector: Injector) {
        super(injector, 'api/stats/studentstats?tttonly=true&');
    }
}

@Injectable()
export class ProfileVeteranResourceService extends ResourceServiceBase<Profile> {

    constructor(protected injector: Injector) {
        super(injector, 'api/Applications', [], 10, `type=="3" or type=="2"`);
    }
}

@Injectable()
export class ProfileResourceService extends ResourceServiceBase<Profile> {

    constructor(protected injector: Injector) {
        super(injector, 'api/Applications', [], 10, `type=="3"`);
    }
}

@Injectable()
export class GraduationLocationsService extends ResourceServiceBase<GraduationLocation> {

    constructor(protected injector: Injector) {
        super(injector, 'api/ClassesGraduationLocations');
    }
}

@Injectable()
export class CampusesService extends ResourceServiceBase<Campus> {

    constructor(protected injector: Injector) {
        super(injector, 'api/ClassCampuses');
    }
}

@Injectable()
export class HearAboutProgramService extends ResourceServiceBase<Reference> {

    constructor(protected injector: Injector) {
        super(injector, 'api/ApplicationHearAboutProgramSources');
    }
}

@Injectable()
export class ExitReasonsService extends ResourceServiceBase<ExitReason> {

    constructor(protected injector: Injector) {
        super(injector, 'api/ApplicationProgramExitReasons');
    }
}

@Injectable()
export class CallReasonsService extends ResourceServiceBase<CallReason> {

    constructor(protected injector: Injector) {
        super(injector, 'api/CompanyCallReason');
    }
}


@Injectable()
export class CompanyContactsService extends ResourceServiceBase<CompanyContacts> {

    constructor(protected injector: Injector) {
        super(injector, 'api/CompanyContacts');
    }
}

@Injectable()
export class ClassesScheduleService extends ResourceServiceBase<ScheduledClass> {

    constructor(protected injector: Injector) {
        super(injector, 'api/Classes');
    }
}

@Injectable()
export class StudentGraduationsResourseService extends ResourceServiceBase<StudentGraduation> {
    constructor(injector: Injector) {
        super(injector, 'api/Graduations');
    }
}

@Injectable()
export class LevelsService extends ResourceServiceBase<Level> {

    constructor(protected injector: Injector) {
        super(injector, 'api/ClassGraduationLevels');
    }
}
@Injectable()
export class MilitaryBaseService extends ResourceServiceBase<MilitaryBase> {

    constructor(protected injector: Injector) {
        super(injector, 'api/MilitaryBases');
    }
}

@Injectable()
export class OfficeLocationService extends ResourceServiceBase<OfficeLocation> {

    constructor(protected injector: Injector) {
        super(injector, 'api/officelocations');
    }
}

@Injectable()
export class FeedbacksService extends ResourceServiceBase<Feedback> {

    constructor(protected injector: Injector) {
        super(injector, 'api/feedbacks');
    }
}

@Injectable()
export class CompanyAffiliatesService extends ResourceServiceBase<CompanyAffiliate> {

    constructor(protected injector: Injector) {
        super(injector, 'api/companyaffiliates');
    }
}

@Injectable()
export class CompanyResourceService extends ResourceServiceBase<Company> {

    constructor(
        protected injector: Injector,
    ) {
        super(injector, 'api/Companies', [
            'CompanyContacts',
            'CompanyAlternateLocations',
            'CompanyCommunicationHistory',
        ]);
    }

  // tslint:disable-next-line:max-line-length
    query(filter: string = '', order: string = '', args: string[] = [], incluses: string = '', selectJSONPath: string = ''): Promise<Company[]> {
        const f = filter ? filter : 'isProspect!=true';
        const o = order ? order : 'name';
        return super.query(f, o, args, incluses, selectJSONPath);
    }

}

@Injectable()
export class InterviewTypeService extends ResourceServiceBase<InterviewType> {

    constructor(protected injector: Injector) {
        super(injector, 'api/InterviewTypes');
    }
}

@Injectable()
export class ClassWithdrawReasonService extends ResourceServiceBase<WithdrawReason> {

    constructor(protected injector: Injector) {
        super(injector, 'api/ClassWithdrawnReasons');
    }
}

@Injectable()
export class InterviewOutcomeService extends ResourceServiceBase<InterviewOutcome> {

    constructor(protected injector: Injector) {
        super(injector, 'api/InterviewOutcomes');
    }
}

@Injectable()
export class EmploymentStatusService extends ResourceServiceBase<EmploymentStatus> {
    constructor(protected injector: Injector) {
        super(injector, 'api/EmploymentStatuses');
    }
}

@Injectable()
export class EmploymentHistoryResourceService extends ResourceServiceBase<EmploymentHistory> {
    constructor(injector: Injector) {
        super(injector, 'api/EmploymentHistory');
    }
}

@Injectable()
export class EmploymentCompanyResourceService extends ResourceServiceBase<EmploymentCompany> {
    constructor(injector: Injector) {
        super(injector, 'api/EmploymentCompanies');
    }
}

@Injectable()
export class WorkforceTrainingPersonalResourceService extends ResourceServiceBase<WorkforceTrainingPersonal> {
    constructor(injector: Injector) {
        super(injector, 'api/WorkforceTrainingPersonal');
    }
}

@Injectable()
export class WorkforceTrainingPersonalItemResourceService extends ResourceServiceBase<WorkforceTrainingPersonal> {
    constructor(injector: Injector) {
        super(injector, 'api/WorkforceTrainingPersonalItem', [
            'WorkforceTrainingPersonal',
        ]);
    }
}

@Injectable()
export class WorkforceTrainingCompanyResourceService extends ResourceServiceBase<WorkforceTrainingCompany> {
    constructor(injector: Injector) {
        super(injector, 'api/WorkforceTrainingCompany');
    }
}

@Injectable()
export class ToolsResourceService extends ResourceServiceBase<Tools> {
    constructor(injector: Injector) {
        super(injector, 'api/ToolsOrders');
    }
}

@Injectable()
export class MentorshipResourceService extends ResourceServiceBase<Mentorship> {
    constructor(injector: Injector) {
        super(injector, 'api/mentors');
    }
}

@Injectable()
export class HousingAllowanceResourceService extends ResourceServiceBase<HousingAllowance> {
    constructor(injector: Injector) {
        super(injector, 'api/HousingAllowance');
    }
}

@Injectable()
export class InterviewResourceService extends ResourceServiceBase<Interview> {
    constructor(injector: Injector) {
        super(injector, 'api/interviews');
    }
}

@Injectable()
export class RegistrationEventService extends ResourceServiceBase<RegistrationEvent> {
    constructor(injector: Injector) {
        super(injector, 'api/RegistrationEvents');
    }
}


@Injectable()
export class CommunicationHistoryResourceService extends ResourceServiceBase<CompanyCommunicationHistory> {
    constructor(injector: Injector) {
        super(injector, 'api/CompanyCommunicationHistory');
    }
}

@Injectable()
export class NonPlacementReasonService extends ResourceServiceBase<NonPlacementReason> {

    constructor(injector: Injector) {
        super(injector, 'api/EmploymentNonPlacementReasons');
    }

}

// Military Branch
@Injectable()
export class MilitaryService extends ResourceServiceBase<MilitaryBranch> {

    constructor(injector: Injector) {
        super(injector, 'api/ApplicationMilitaryBranches');
    }

}

@Injectable()
export class MilitaryBranchStatsService extends ResourceServiceBase<ProfileStats> {

    constructor(injector: Injector) {
        super(injector, '/api/Reports/ProfilePerMilBaseMilBranch');
    }

    getStats(): Promise<ProfileStats> {
        return this.http.get<ProfileStats>('/api/Reports/ProfilePerMilBaseMilBranch')
            .toPromise()
            .catch(this.handleError);
    }

}

@Injectable()
export class OrientationEventResourceService extends ResourceServiceBase<OrientationEvent> {

    constructor(injector: Injector) {
        super(injector, 'api/OrientationEvents');
    }
}

@Injectable()
export class RegistrationEventResourceService extends ResourceServiceBase<OrientationEvent> {

    constructor(injector: Injector) {
        super(injector, 'api/RegistrationEvents');
    }
}

@Injectable()
export class DiscountResourceService extends ResourceServiceBase<Discount> {

    constructor(injector: Injector) {
        super(injector, 'api/ClassDiscounts');
    }
}

@Injectable()
export class AffiliationTypesService extends ResourceServiceBase<AffiliationType> {

    constructor(injector: Injector) {
        super(injector, 'api/ApplicationAffiliationTypes');
    }
}
