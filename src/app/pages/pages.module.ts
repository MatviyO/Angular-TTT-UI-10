import { NgModule } from '@angular/core';
import {PageRoutingModule} from './pages.routing';
import { NgaModule } from '../theme/nga.module';
// import { AppTranslationModule } from '../app.translation.module';
import { PagesComponent} from './pages.component';
// import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { FormsModule } from '@angular/forms';

// import { FileDropModule } from 'ngx-file-drop';
import {Common_Module} from '../common';
import {RouterModule} from '@angular/router';
import {DashboardModule} from './dashboard/dashboard.module';

// used to create fake backend
// import { fakeBackendProvider } from '@ttt/common';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';


@NgModule({
  imports: [
    // AppTranslationModule,
    NgaModule,
    FormsModule,
    PageRoutingModule,
    Common_Module,
    RouterModule,
    DashboardModule,
    // FileDropModule,

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
