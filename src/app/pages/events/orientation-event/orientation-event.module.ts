import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../theme/nga.module';
import { OrientationEventService } from './orientation-event.service';
import { routing } from './orientation-event.routing';
import { OrientationEventComponent } from './orientation-event.component';
import { OrientationEventListComponent } from './components/list/orientation-event.list.component';
import { OrientationEventDetailsComponent } from './components/details/orientation-event.details.component';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {Common_Module} from '../../../common';
import {OrientationEventResourceService} from '../../../core/data';

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
