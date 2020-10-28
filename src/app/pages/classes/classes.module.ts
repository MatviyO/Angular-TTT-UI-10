import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ClassesListComponent, ClassesDetailsComponent } from './components';
import { routing } from './classes.routing';
import {
  ClassesScheduleService,
  ClassesService,
  GraduationDatesService, GraduationLocationsService,
  LevelsService, ProfileResourceService,
  StudentGraduationService,
  TradesService
} from '../../core/data';
import {Common_Module} from '../../common';
import {CoreModule} from '../../core';

@NgModule({
    providers: [
        ClassesService,
        StudentGraduationService,
        GraduationLocationsService,
        GraduationDatesService,
        TradesService,
        ProfileResourceService,
        ClassesScheduleService,
        LevelsService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Common_Module,
        CoreModule,
        routing,
    ],
    declarations: [
        ClassesListComponent,
        ClassesDetailsComponent,
    ],
})
export class ClassesModule {

}
