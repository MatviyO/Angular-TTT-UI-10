import { NgModule } from '@angular/core';
import {PageRoutingModule} from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { PagesComponent} from './pages.component';
import { FormsModule } from '@angular/forms';
import {Common_Module} from '../common';
import {RouterModule} from '@angular/router';
import {DashboardModule} from './dashboard/dashboard.module';
import {AgmCoreModule} from '@agm/core';


@NgModule({
  imports: [
    // AppTranslationModule,
    NgaModule,
    FormsModule,
    PageRoutingModule,
    Common_Module,
    RouterModule,
    DashboardModule,
    // AgmCoreModule.forRoot({
    //   // apiKey: 'AIzaSyB6v8rDxN0FWdpHJd96bXwePUQiBm_qYwE',
    //   // apiKey: 'AIzaSyCoKa5xmDH73xLe1deCvTBpyhD2VRom0Ys',
    //   apiKey: 'AIzaSyCmii2YaZXw2Rxw7FlqFYqZf-5DX64y0Rw',
    // }),
  ],
  declarations: [
    PagesComponent
  ],
  providers: [
  ],
  exports: [
    PagesComponent
  ],
})

export class PagesModule {
}
