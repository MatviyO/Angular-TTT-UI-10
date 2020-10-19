import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SettingsComponent } from './settings.component';
// import { ReferencesComponent, ReferencesService } from './references';
// import { ExitReasonsComponent, ExitReasonsService } from './exit-reasons';
import { CampusesComponent, CampusesService } from './campuses';
import { GraduationLocationsComponent, GraduationLocationsService } from './graduation-locations';
import { MilitaryBaseComponent, MilitaryBaseService } from './military-base';
import { OfficeLocationsComponent, OfficeLocationService } from './office-locations';
// import { FeedbacksComponent, FeedbacksService } from './feedbacks';
// import { InterviewTypeComponent, InterviewTypeService } from './interview-type';
// import { InterviewStatusComponent, InterviewStatusService } from './interview-status';
// import { InterviewOutcomeComponent, InterviewOutcomeService } from './interview-outcome';
// import { EmploymentStatusComponent, EmploymentStatusService } from './employment-status';
// import { CallReasonsComponent, CallReasonsService } from './call-reasons';
import { NonPlacementReasonComponent, NonPlacementReasonService } from './non-placement-reason';
import { ClassScheduleModule } from './classes-schedule/classes-schedule.module';
import {Common_Module} from '../../common';
import {SettingsRoutingModule} from './settings.routing';
import { GraduationDatesService} from '../../core/data';
import {CountryStatesService} from '../../core/data/country-state.service';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {CompanyAffiliatesService, CompanyAffiliatesComponent} from './company-affiliates';
import {CompanyModule} from './company/company.module';
import { MilitaryBranchComponent, MilitaryBranchService } from './military-branch';
import { ReferencesComponent } from './references/references.component';

@NgModule({
    imports: [
        ClassScheduleModule,
        CommonModule,
        CompanyModule,
        Common_Module,
        FormsModule,
        NgaModule,
        SettingsRoutingModule,
        NguiAutoCompleteModule,
        // TextMaskModule,
    ],
    declarations: [
        NonPlacementReasonComponent,
        SettingsComponent,
        // ReferencesComponent,
        // ExitReasonsComponent,
        CampusesComponent,
        GraduationLocationsComponent,
        CompanyAffiliatesComponent,
        CampusesComponent,
        OfficeLocationsComponent,
        OfficeLocationsComponent,
        MilitaryBaseComponent,
        MilitaryBranchComponent,
        // FeedbacksComponent,
        // CallReasonsComponent,
        // InterviewTypeComponent,
        // InterviewOutcomeComponent,
        // InterviewStatusComponent,
        // EmploymentStatusComponent,
        MilitaryBranchComponent,
        ReferencesComponent
    ],
    providers: [
        NonPlacementReasonService,
        CampusesService,
        GraduationDatesService,
        OfficeLocationService,
        // FeedbacksService,
        // ReferencesService,
        // ExitReasonsService,
        MilitaryBaseService,
        GraduationLocationsService,
        CompanyAffiliatesService,
        // CallReasonsService,
        // InterviewTypeService,
        // InterviewOutcomeService,
        // InterviewStatusService,
        // EmploymentStatusService,
        MilitaryBranchService,
        CountryStatesService
    ],
})
export class SettingsModule { }
