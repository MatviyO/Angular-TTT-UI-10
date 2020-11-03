import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppState, InternalStateType} from './app.service';
import { RouterModule } from '@angular/router';
import {GlobalState} from './global.state';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './interceptors';
import {LoginComponent} from './pages/login/login.component';
import {NgaModule} from './theme/nga.module';
import {MemoryCache, MemoryDataStorage, NavigationHelper, UrlProvider} from './common/utils';
import {TriggerHelper, TriggerService} from './core/data';
import {NotificationService} from './common/services';
import {AuthenticationService} from './core/auth';
import {Common_Module} from './common';
import {AgmCoreModule} from '@agm/core';

const APP_PROVIDERS = [
  AppState,
  GlobalState,
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void,
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
    }),
    NgaModule,
    Common_Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCmii2YaZXw2Rxw7FlqFYqZf-5DX64y0Rw',
    }),
  ],
  providers: [APP_PROVIDERS,
    AuthenticationService ,
    NotificationService,
    MemoryDataStorage,
    NavigationHelper,
    UrlProvider,
    MemoryCache,
    TriggerService,
    TriggerHelper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor, multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
