import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { ProfileListComponent, ProfileDetailsComponent } from './components';

import { routing } from './profile.routing';

import { ExitsComponent } from './components/details/components/exits/exits.component';
import { CommunicationCompanyComponent } from './components/details/components/communication-company';
import { ApplicationNoteComponent } from './components/details/components/communication-notes/communication-notes.component';
import { CommunicationHistoryService } from './components/details/components/communication-company/communication-company.service';
import {ListenerService} from '../../common/services';
import {
  ExitReasonsService,
  HearAboutProgramService, MilitaryBaseService,
  MilitaryService,
  ProfileService,
  RankResourceService,
  StatesService,
  TradesService
} from '../../core/data';
import {Common_Module} from '../../common';
import {CoreModule} from '../../core';
import {CountryStatesService} from '../../core/data/country-state.service';

@NgModule({
  providers: [
    ExitReasonsService,
    HearAboutProgramService,
    MilitaryService,
    ProfileService,
    StatesService,
    CountryStatesService,
    TradesService,
    MilitaryBaseService,
    ExitReasonsService,
    ListenerService,
    CommunicationHistoryService,
    RankResourceService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Common_Module,
    routing,
    CoreModule,

  ],
  declarations: [
    ProfileListComponent,
    ProfileDetailsComponent,
    ExitsComponent,
    CommunicationCompanyComponent,
    ApplicationNoteComponent,
  ],

})
export class ProfileModule {

}
