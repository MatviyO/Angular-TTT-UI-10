import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { ProgramStatsComponent } from './program-stats/program-stats.component';
import { ApplicationProcessComponent } from './application-process/application-process.component';
import { ToolsStatsComponent } from './tools-stats/tools-stats.component';
import { RideAlongStatsComponent } from './ride-along-stats/ride-along-stats.component';
import { ScheduleInterviewsStatsComponent } from './schedule-interviews-stats/schedule-interviews-stats.component';
import { HillerWorkforceStatsComponent } from './hiller-workforce-stats/hiller-workforce-stats.component';
import { HousingAllowanceStatsComponent } from './housing-allowance-stats/housing-allowance-stats.component';
import { MentorshipStatsComponent } from './mentorship-stats/mentorship-stats.component';
import { BonusStatsComponent } from './bonus-stats/bonus-stats.component';
import { InterviewFeedbackStatsComponent } from './interview-feedback-stats/interview-feedback-stats.component';

import { ClassActivityComponent } from './class-activity/class-activity.component';
import { ClassActivityModule } from './class-activity/class-activity.module';
import { ClassAvtivityService, ClassActivityListComponent } from './class-activity/components';
import { MilitaryStatsModule } from './military-stats/military-stats.module';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {
  ClassesScheduleService,
  GraduationDatesService, HousingAllowanceResourceService, InterviewResourceService,
  MentorshipResourceService, ProfileResourceService,
  StudentGraduationsResourseService, ToolsResourceService
} from '../../core/data';
import {Common_Module} from '../../common';


@NgModule({
  imports: [
    CommonModule,
    Common_Module,
    FormsModule,
    NgaModule,
    routing,
    ClassActivityModule,
    NguiAutoCompleteModule,
    MilitaryStatsModule,
  ],
  declarations: [
    DashboardComponent,
    ProgramStatsComponent,
    ApplicationProcessComponent,
    ToolsStatsComponent,
    RideAlongStatsComponent,
    ScheduleInterviewsStatsComponent,
    HillerWorkforceStatsComponent,
    HousingAllowanceStatsComponent,
    MentorshipStatsComponent,
    BonusStatsComponent,
    InterviewFeedbackStatsComponent,
    ClassActivityComponent,
    ClassActivityListComponent,
  ],
  providers: [
    GraduationDatesService,
    ProfileResourceService,
    StudentGraduationsResourseService,
    ClassesScheduleService,
    ToolsResourceService,
    MentorshipResourceService,
    InterviewResourceService,
    HousingAllowanceResourceService,
    ClassAvtivityService,
  ],
})
export class DashboardModule { }
