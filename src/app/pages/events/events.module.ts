import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { EventsComponent } from './events.component';
import {Common_Module} from '../../common';
import {routing} from './events.routing';

@NgModule({
  imports: [
    CommonModule,
    Common_Module,
    FormsModule,
    NgaModule,
    routing,
    // GraduationsModule,
    // RegistrationEventModule,
    // OrientationEventModule,
  ],
  declarations: [
    EventsComponent,
  ],
  providers: [
    // GraduationDatesService,
    // RegistrationEventService,
    // OrientationEventService,
  ],
})
export class EventsModule { }
