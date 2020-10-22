import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { EventsComponent } from './events.component';
import { routing } from './events.routing';
import { GraduationsModule } from './graduations-event/graduations.module';
import { RegistrationEventModule } from './registration-event/registration-event.module';
import { RegistrationEventService } from './registration-event/registration-event.service';
import { OrientationEventService } from './orientation-event/orientation-event.service';
import { OrientationEventModule } from './orientation-event/orientation-event.module';
import {Common_Module} from '../../common';
import {GraduationDatesService} from '../../core/data';

@NgModule({
    imports: [
        CommonModule,
        Common_Module,
        FormsModule,
        NgaModule,
        routing,
        GraduationsModule,
        RegistrationEventModule,
        OrientationEventModule,
    ],
    declarations: [
        EventsComponent,
    ],
    providers: [
        GraduationDatesService,
        RegistrationEventService,
        OrientationEventService,
    ],
})
export class EventsModule { }
