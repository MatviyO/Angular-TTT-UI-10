import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../theme/nga.module';
import { Common_Module } from '@ttt/common';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { OrientationEventService } from './orientation-event.service';
import { routing } from './orientation-event.routing';
import { OrientationEventComponent } from './orientation-event.component';
import { OrientationEventListComponent } from './components/list/orientation-event.list.component';
import { OrientationEventDetailsComponent } from './components/details/orientation-event.details.component';
import { OrientationEventResourceService } from 'app/core';

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
        OrientationEventComponent,
        OrientationEventListComponent,
        OrientationEventDetailsComponent,
    ],
    providers: [
        OrientationEventResourceService,
        OrientationEventService,
    ],
})
export class OrientationEventModule {

}
