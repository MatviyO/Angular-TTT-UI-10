import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '././environments/environment';
import { AppModule } from './app/app.module';
import { appInjector } from './app/app.injector';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((appRef: NgModuleRef<AppModule>) => {
    // store a reference to the application injector
    appInjector(appRef.injector);

    // if ('serviceWorker' in navigator) {
    //  navigator.serviceWorker.register('/ngsw-worker.js');
    // }
  })
  .catch(err => {});
