import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../../theme/nga.module';
import { Common_Module } from '@ttt/common';
import { WorkforceTrainingCompanyService } from '@ttt/core/data';
import { WorkforceCompanyListComponent } from '../company/components/list';
import { routing } from './workforce-company.routing';

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
