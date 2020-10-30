import { Routes, RouterModule } from '@angular/router';

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


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'program-stats', component: ProgramStatsComponent },
            { path: 'application-process', component: ApplicationProcessComponent },
            { path: 'tools-stats', component: ToolsStatsComponent },
            { path: 'ride-along-stats', component: RideAlongStatsComponent },
            { path: 'schedule-interviews-stats', component: ScheduleInterviewsStatsComponent },
            { path: 'interview-feedback-stats', component: InterviewFeedbackStatsComponent },
            { path: 'hiller-workforce-stats', component: HillerWorkforceStatsComponent },
            { path: 'housing-allowance-stats', component: HousingAllowanceStatsComponent },
            { path: 'sign-on-bonus-stats', component: BonusStatsComponent },
            { path: 'mentorship-stats', component: MentorshipStatsComponent },
            { path: 'class-activity', component: ClassActivityComponent },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
