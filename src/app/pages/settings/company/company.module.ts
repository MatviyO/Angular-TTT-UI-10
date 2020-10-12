import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompanyComponent} from './company.component';
import { CompanyListComponent } from './components/list/company-list.component';
import {CompanyRoutingModule} from './company-routing.module';
import {NgaModule} from '../../../theme/nga.module';
import {FormsModule} from '@angular/forms';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {ListenerService} from '../../../common/services';
import {CompanyContactsService, CompanyService, StatesService, TradesService} from '../../../core/data';
import {Common_Module} from '../../../common';
import { CompanyDetailsComponent } from './components/details/company-details.component';
import { AlternativeLocationsComponent } from './components/details/components/alternative-locations/alternative-locations.component';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    Common_Module,
    NgaModule,
    FormsModule,
    NguiAutoCompleteModule,
  ],
  declarations: [CompanyComponent, CompanyListComponent, CompanyDetailsComponent, AlternativeLocationsComponent],
  providers: [
    CompanyService,
    TradesService,
    StatesService,
    ListenerService,
    // AlternativeLocationService,
    CompanyContactsService,
    // CommunicationHistoryService,
  ]
})
export class CompanyModule { }
