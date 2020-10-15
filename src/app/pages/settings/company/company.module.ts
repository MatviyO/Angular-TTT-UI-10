import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../theme/nga.module';

import { CompanyListComponent, CompanyDetailsComponent } from './components';
import { CompanyComponent } from './company.component';
import { routing } from './company.routing';
import { AlternativeLocationsComponent, CompanyContactsComponent, CompanyCommunicationHistoryComponent } from './components';
import { AlternativeLocationService } from './components/details/components/alternativeLocations/alternativeLocations.service';
import { CompanyContactsService } from './components/details/components/contacts/contacts.service';
import { CommunicationHistoryService } from './components/details/components/communication-history/communication-history.service';
import {Common_Module, ListenerService} from '../../../common';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {CompanyService, StatesService, TradesService} from '../../../core/data';
import {ClassScheduleModule} from '../classes-schedule/classes-schedule.module';
import {NgxUploaderModule} from 'ngx-uploader';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    Common_Module,
    routing,
    FormsModule,
    // TextMaskModule,
    NguiAutoCompleteModule,
    ClassScheduleModule,
    NgxUploaderModule
  ],
    declarations: [
        CompanyDetailsComponent,
        CompanyListComponent,
        CompanyComponent,
        AlternativeLocationsComponent,
        CompanyContactsComponent,
        CompanyCommunicationHistoryComponent,
    ],
    providers: [
        CompanyService,
        TradesService,
        StatesService,
        ListenerService,
        AlternativeLocationService,
        CompanyContactsService,
        CommunicationHistoryService,
    ],
})
export class CompanyModule {

}
