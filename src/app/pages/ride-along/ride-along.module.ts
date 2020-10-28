import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RideAlongDetailsComponent } from './components/details/ride-along.details.component';
import { RideAlongListComponent } from './components/list/ride-along.list.component';
import { routing } from './ride-along.routing';
import {FeedbacksService, OfficeLocationService, RideAlongService, RideAlongStatusService, TradesService} from '../../core/data';
import {Common_Module} from '../../common';

@NgModule({
    providers: [
        RideAlongService,
        RideAlongStatusService,
        TradesService,
        OfficeLocationService,
        FeedbacksService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Common_Module,
        routing,
        // Ng2AutoCompleteModule,
    ],
    declarations: [
        RideAlongDetailsComponent,
        RideAlongListComponent,
    ],
})
export class RideAlongModule {
}
