import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../../theme/nga.module';

import { WorkforcePersonalListComponent, WorkforcePersonalDetailsComponent } from './components';
import { routing } from './workforce-personal.routing';
import {Common_Module} from '../../../common';
import {WorkforceTrainingPersonalService} from '../../../core/data';

@NgModule({
    providers: [
        WorkforceTrainingPersonalService,
    ],
    imports: [
        CommonModule,
        Common_Module,
        FormsModule,
        NgaModule,
        routing,
    ],
    declarations: [
        WorkforcePersonalListComponent,
        WorkforcePersonalDetailsComponent,
    ],
})
export class WorkforcePersonalModule {
}
