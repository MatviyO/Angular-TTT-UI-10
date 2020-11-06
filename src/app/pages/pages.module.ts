import { NgModule } from '@angular/core';
import {PageRoutingModule} from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { PagesComponent} from './pages.component';
import { FormsModule } from '@angular/forms';
import {Common_Module} from '../common';
import {RouterModule} from '@angular/router';
import {DashboardModule} from './dashboard/dashboard.module';

@NgModule({
  imports: [
    // AppTranslationModule,
    NgaModule,
    FormsModule,
    PageRoutingModule,
    Common_Module,
    RouterModule,
    DashboardModule,

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
