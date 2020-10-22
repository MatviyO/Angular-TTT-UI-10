import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../theme/nga.module';

import { RegistrationEventListComponent, RegistrationEventDetailsComponent } from './components';

import { routing } from './registration-event.routing';
import { RegistrationEventComponent } from './registration-event.component';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {Common_Module} from '../../../common';
import {RegistrationEventResourceService} from '../../../core/data';
import {RegistrationEventService} from './registration-event.service';

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
        RegistrationEventComponent,
        RegistrationEventListComponent,
        RegistrationEventDetailsComponent,
    ],
    providers: [
        RegistrationEventService,
        RegistrationEventResourceService,
    ],
})
export class RegistrationEventModule {

}
