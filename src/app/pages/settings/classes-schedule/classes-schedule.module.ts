import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../theme/nga.module';
import {Common_Module} from '../../../common';
import { ClassesScheduleListComponent, ClassesScheduleDetailsComponent } from './components';
import { ClassesScheduleComponent } from './classes-schedule.component';
import { routing } from './classes-schedule.routing';
import { CampusesService, TradesService, ClassesService } from '../../../core';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {ConfirmComponent} from '../../../common/components/confirm/confirm.component';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        Common_Module,
        routing,
        FormsModule,
        NguiAutoCompleteModule,
    ],
    declarations: [
        ConfirmComponent,
        ClassesScheduleComponent,
        ClassesScheduleListComponent,
        ClassesScheduleDetailsComponent,
    ],
    providers: [
        ClassesService,
        CampusesService,
        TradesService,
    ],
    exports: [
        ConfirmComponent
    ]
})
export class ClassScheduleModule {

}
