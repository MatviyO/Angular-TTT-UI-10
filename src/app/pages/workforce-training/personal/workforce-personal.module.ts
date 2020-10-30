import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../../theme/nga.module';
import { Common_Module } from '@ttt/common';
import { WorkforceTrainingPersonalService } from '@ttt/core/data';
import { WorkforcePersonalListComponent, WorkforcePersonalDetailsComponent } from './components';
import { routing } from './workforce-personal.routing';

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
