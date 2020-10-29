import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { MentorshipListComponent, MentorshipDetailsComponent } from './components';
import { routing } from './mentorship.routing';

// Component to be loaded dynamically
import { CompanyDetailsComponent } from '../settings/company/components';
import { CompanyModule } from '../settings/company/company.module';
import {CompanyResourceService, FeedbacksService, MentorshipService} from '../../core/data';
import {Common_Module} from '../../common';

@NgModule({
    providers: [
        MentorshipService,
        FeedbacksService,
        CompanyResourceService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Common_Module,
        routing,
        CompanyModule,
    ],
    declarations: [
        MentorshipListComponent,
        MentorshipDetailsComponent,
    ],
    entryComponents: [CompanyDetailsComponent],
})
export class MentorshipModule {

}
