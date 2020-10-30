import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../../theme/nga.module';
import { WorkforceCompanyListComponent } from '../company/components/list';
import { routing } from './workforce-company.routing';
import {WorkforceTrainingCompanyService} from '../../../core/data';
import {Common_Module} from '../../../common';

@NgModule({
    providers: [
        WorkforceTrainingCompanyService,
    ],
    imports: [
        CommonModule,
        Common_Module,
        FormsModule,
        NgaModule,
        routing,
    ],
    declarations: [
        WorkforceCompanyListComponent,
    ],
})
export class WorkforceCompanyModule {
}
