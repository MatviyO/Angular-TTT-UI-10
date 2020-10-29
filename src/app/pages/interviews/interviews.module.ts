import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { InterviewsDetailsComponent, InterviewsListComponent } from './components';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './interviews.routing';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {
  CompanyService,
  FeedbacksService,
  InterviewService,
  InterviewStatusService,
  ProfileResourceService,
  TradesService
} from '../../core/data';
import {Common_Module} from '../../common';
import {CoreModule} from '../../core';


@NgModule({
    providers: [
        InterviewService,
        CompanyService,
        FeedbacksService,
        TradesService,
        InterviewStatusService,
        ProfileResourceService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Common_Module,
        CoreModule,
        NgbRatingModule,
        routing,
        NguiAutoCompleteModule,
    ],

    declarations: [
        InterviewsListComponent,
        InterviewsDetailsComponent
    ],
})
export class InterviewsModule {
}
