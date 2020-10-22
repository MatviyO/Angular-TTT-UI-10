import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../theme/nga.module';
import { Common_Module } from '@ttt/common';

import { RegistrationEventListComponent, RegistrationEventDetailsComponent } from './components';

import { routing } from './registration-event.routing';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { RegistrationEventService, RegistrationEventResourceService } from 'app/core/data';
import { RegistrationEventComponent } from './registration-event.component';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        Common_Module,
        routing,
        FormsModule,
        Ng2AutoCompleteModule,
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
