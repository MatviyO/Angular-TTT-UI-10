import {Component, Inject, ViewContainerRef} from '@angular/core';
import {NavigationHelper} from './common/utils';
import {GlobalState} from './global.state';
import {NavigationEnd, Router} from '@angular/router';
import {LocationStrategy, PathLocationStrategy, PlatformLocation} from '@angular/common';
import {BaThemeConfig} from './theme';
import {INavigationHelper} from './common/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppComponent {
  isMenuCollapsed = false;
  prevLocation: string;
  cuurentLocation: string;
  title = 'ttt-new-ui';
  location: Location;

  constructor(private state: GlobalState,
              private themeConfig: BaThemeConfig,
              private viewContainerRef: ViewContainerRef,
              private platLocation: PlatformLocation,
              private router: Router,
              @Inject(NavigationHelper) private navigation: INavigationHelper,
  ) {

    themeConfig.config();

    this.platLocation.onPopState((event) => {
      if (this.prevLocation === location.pathname) {
        this.prevLocation = '';
        this.cuurentLocation = '';
        this.navigation.back();
      }
    });


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.prevLocation = this.cuurentLocation;
        this.cuurentLocation = location.pathname;
      }
    });


    this.state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });


    // this.location.subscribe(x => {
    //   // if(x.type == 'popstate'){
    //   //   this._navigation.back();
    //   // }
    // });
  }
}
