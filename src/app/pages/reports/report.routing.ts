import { Routes, RouterModule } from '@angular/router';
import { EmploymentReportComponent } from './employment-report/employment-report.component';
import { InterviewReportComponent } from './interview-report/interview-report.component';
import { ReportComponent } from './report.component';


const routes: Routes = [
    {
        path: '',
        component: ReportComponent,
        children: [
            { path: 'employment-report', component: EmploymentReportComponent },
            { path: 'interview-report', component: InterviewReportComponent },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
