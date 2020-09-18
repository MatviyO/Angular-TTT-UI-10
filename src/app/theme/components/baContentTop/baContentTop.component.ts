import { Component, Inject } from '@angular/core';


import { GlobalState } from '../../../global.state';
import {INavigationHelper, NavigationItem} from '../../../common/interfaces';
import {NavigationHelper} from '../../../common/utils';

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'app-ba-content-top',
    styleUrls: ['./baContentTop.scss'],
    templateUrl: './baContentTop.html',
})
// tslint:disable-next-line:component-class-suffix
export class BaContentTopCommponent {

    activePageTitle: string = '';
    navs: NavigationItem[];

    constructor(
        private _state: GlobalState,
        @Inject(NavigationHelper) private _navigation: INavigationHelper,
    ) {

        this._state.subscribe('menu.activeLink', (activeLink) => {
            if (activeLink) {
                this.activePageTitle = activeLink.title;
            }
        });

        this._navigation.onChange((navs) => {
            this.updateBreadcrumbs(navs);
        });
    }

    updateBreadcrumbs = (items: NavigationItem[]): void  => { this.navs = items};

    navigate = (item: NavigationItem) => this._navigation.navigate(item);
}
