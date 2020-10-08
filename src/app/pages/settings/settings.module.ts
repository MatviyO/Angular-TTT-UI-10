import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';

import { SettingsComponent } from './settings.component';
// import { ReferencesComponent, ReferencesService } from './references';
// import { MilitaryComponent, MilitaryService } from './military';
// import { ExitReasonsComponent, ExitReasonsService } from './exit-reasons';
// import { CampusesComponent, CampusesService } from './campuses';
import { GraduationLocationsComponent, GraduationLocationsService } from './graduation-locations';
// import { BaseNameComponent, MilitaryBaseService } from './base-name';
// import { OfficeLocationComponent, OfficeLocationService } from './office-locations';
// import { FeedbacksComponent, FeedbacksService } from './feedbacks';
// import { CompanyAffiliatesComponent, CompanyAffiliatesService } from './company-affiliates';
// import { InterviewTypeComponent, InterviewTypeService } from './interview-type';
// import { InterviewStatusComponent, InterviewStatusService } from './interview-status';
// import { InterviewOutcomeComponent, InterviewOutcomeService } from './interview-outcome';
// import { EmploymentStatusComponent, EmploymentStatusService } from './employment-status';
// import { CallReasonsComponent, CallReasonsService } from './call-reasons';
import { NonPlacementReasonComponent, NonPlacementReasonService } from './non-placement-reason';
// import { CompanyModule } from './company/company.module';
import { ClassScheduleModule } from './classes-schedule/classes-schedule.module';
import {Common_Module} from '../../common';
import {SettingsRoutingModule} from './settings.routing';
import {GraduationDatesService} from '../../core/data';
import {CountryStatesService} from '../../core/data/country-state.service';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import { CompanyComponent } from './company/company.component';

@NgModule({
    imports: [
        ClassScheduleModule,
        CommonModule,
        Common_Module,
        FormsModule,
        NgaModule,
        SettingsRoutingModule,
        NguiAutoCompleteModule
        // TextMaskModule,
        // CompanyModule,
    ],
    declarations: [
        NonPlacementReasonComponent,
        SettingsComponent,
        // ReferencesComponent,
        // ExitReasonsComponent,
        // CampusesComponent,
        GraduationLocationsComponent,
        // CompanyComponent,
        // BaseNameComponent,
        // OfficeLocationComponent,
        // FeedbacksComponent,
        // CompanyAffiliatesComponent,
        // CallReasonsComponent,
        // InterviewTypeComponent,
        // InterviewOutcomeComponent,
        // InterviewStatusComponent,
        // EmploymentStatusComponent,
        // MilitaryComponent,
    ],
    providers: [
        NonPlacementReasonService,
        // CampusesService,
        GraduationDatesService,
        // OfficeLocationService,
        // FeedbacksService,
        // ReferencesService,
        // ExitReasonsService,
        // MilitaryBaseService,
        GraduationLocationsService,
        // CompanyAffiliatesService,
        // CallReasonsService,
        // InterviewTypeService,
        // InterviewOutcomeService,
        // InterviewStatusService,
        // EmploymentStatusService,
        // MilitaryService,
        CountryStatesService
    ],
})
export class SettingsModule { }
