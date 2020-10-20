import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import {ReferencesComponent} from './references';
import { ExitReasonsComponent } from './exit-reasons/exit-reasons.component';
import { CampusesComponent } from './campuses';
// // import { GraduationsComponent } from './graduations/graduations.component';
import { GraduationLocationsComponent } from './graduation-locations/graduation-locations.component';
import { OfficeLocationsComponent } from './office-locations';
// import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { CompanyAffiliatesComponent } from './company-affiliates';
import { CompanyComponent } from './company/company.component';
// import { CallReasonsComponent } from './call-reasons/call-reasons.component';
// import { InterviewTypeComponent } from './interview-type/interview-type.component';
// import { InterviewStatusComponent } from './interview-status/interview-status.component';
// import { InterviewOutcomeComponent } from './interview-outcome/interview-outcome.component';
// import { EmploymentStatusComponent } from './employment-status/employment-status.component';
import { NonPlacementReasonComponent } from './non-placement-reason/non-placement-reason.component';
import { ClassesScheduleComponent } from './classes-schedule/classes-schedule.component';
import {MilitaryBaseComponent} from './military-base';
import {MilitaryBranchComponent} from './military-branch';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            { path: 'classes-schedule', component: ClassesScheduleComponent },
            { path: 'non-placement-reasons', component: NonPlacementReasonComponent },
            {path: 'references', component: ReferencesComponent},
            { path: 'military', component: MilitaryBranchComponent },
            { path: 'exits', component: ExitReasonsComponent },
            { path: 'campuses', component: CampusesComponent },
            { path: 'graduation-locations', component: GraduationLocationsComponent },
            { path: 'base-name', component: MilitaryBaseComponent },
            { path: 'office-locations', component: OfficeLocationsComponent },
            // { path: 'feedbacks', component: FeedbacksComponent },
            { path: 'company-affiliates', component: CompanyAffiliatesComponent },
            { path: 'company', component: CompanyComponent },
            // { path: 'call-reasons', component: CallReasonsComponent },
            // { path: 'interview-type', component: InterviewTypeComponent },
            // { path: 'interview-status', component: InterviewStatusComponent },
            // { path: 'interview-outcome', component: InterviewOutcomeComponent },
            // { path: 'employment-status', component: EmploymentStatusComponent },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingsRoutingModule {
}
