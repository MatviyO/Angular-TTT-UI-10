import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { HousingTransportationListComponent, HousingTransportationDetailsComponent } from './components';
import { routing } from './housing-transportation.routing';

import { CompanyDetailsComponent } from '../settings/company/components';
import { CompanyModule } from '../settings/company/company.module';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {
  ClassesScheduleService,
  CompanyResourceService, FeedbacksService,
  HousingtranportationOptionsService,
  HousingtranportationService,
  TransportationService
} from '../../core/data';
import {Common_Module, ObservableService} from '../../common';

@NgModule({
    providers: [
        HousingtranportationService,
        FeedbacksService,
        CompanyResourceService,
        HousingtranportationOptionsService,
        TransportationService,
        ClassesScheduleService,
        ObservableService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Common_Module,
        routing,
        CompanyModule,
        NguiAutoCompleteModule
    ],
    declarations: [
        HousingTransportationListComponent,
        HousingTransportationDetailsComponent,
    ],
    entryComponents: [CompanyDetailsComponent],
})
export class HousingTransportationModule {

}
