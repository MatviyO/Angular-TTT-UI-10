import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { JobTrackingListComponent, JobTrackingDetailsComponent } from './components';
import { routing } from './job-tracking.routing';
// Component to be loaded dynamically
import { CompanyDetailsComponent } from '../settings/company/components';
import { CompanyModule } from '../settings/company/company.module';
import { EmploymentStageComponent } from './components/details/stages';
import {
  CompanyResourceService,
  EmploymentService,
  EmploymentStatusService,
  InterviewStatusHelper,
  JobTrackingService
} from '../../core/data';
import {Common_Module, ObservableService} from '../../common';
import {CoreModule} from '../../core';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';

@NgModule({
    providers: [
        CompanyResourceService,
        InterviewStatusHelper,
        JobTrackingService,
        EmploymentService,
        EmploymentStatusService,
        ObservableService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Common_Module,
        CoreModule,
        routing,
        CompanyModule,
        NguiAutoCompleteModule
    ],
    declarations: [
        JobTrackingListComponent,
        JobTrackingDetailsComponent,
        EmploymentStageComponent,
    ],

    entryComponents: [CompanyDetailsComponent],
})
export class JobTrackingModule {

}
