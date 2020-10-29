import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './report.routing';
import { ReportComponent } from './report.component';
import { EmploymentReportComponent } from './employment-report/employment-report.component';
import { InterviewReportComponent } from './interview-report/interview-report.component';
import {Common_Module} from '../../common';
import {EmploymentReportService, InterviewReportService} from '../../core/data';



@NgModule({
    imports: [
        CommonModule,
        Common_Module,
        FormsModule,
        NgaModule,
        routing,
    ],
    declarations: [
        ReportComponent,
        EmploymentReportComponent,
        InterviewReportComponent,
    ],
    providers: [
        EmploymentReportService,
        InterviewReportService,
    ],
})
export class ReportModule { }
