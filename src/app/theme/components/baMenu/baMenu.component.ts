import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { BaMenuService } from '../../services';
import { GlobalState } from '../../../global.state';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ba-menu',
  templateUrl: './baMenu.html',
  styleUrls: ['./baMenu.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class BaMenu implements OnInit, OnDestroy {

    @Input() sidebarCollapsed = false;
    @Input() menuHeight: number;

    @Output() expandMenu = new EventEmitter<any>();

    menuItems: any[];
  // tslint:disable-next-line:variable-name
    protected _menuItemsSub: Subscription;
    showHoverElem: boolean;
    hoverElemHeight: number;
    hoverElemTop: number;
    protected _onRouteChange: Subscription;
    outOfArea: number = -200;

    constructor(
      // tslint:disable-next-line:variable-name
        private _router: Router,
      // tslint:disable-next-line:variable-name
        private _service: BaMenuService,
        private _state: GlobalState,
    ) {
    }

  // tslint:disable-next-line:typedef
    updateMenu(newMenuItems) {
        this.menuItems = newMenuItems;
        this.selectMenuAndNotify();
    }

    selectMenuAndNotify(): void {
        if (this.menuItems) {
            this.menuItems = this._service.selectMenuItem(this.menuItems);
            this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
        }
    }

    ngOnInit(): void {
        this._onRouteChange = this._router.events.subscribe((event) => {

            if (event instanceof NavigationEnd) {
                if (this.menuItems) {
                    this.selectMenuAndNotify();
                } else {
                    // on page load we have to wait as event is fired before menu elements are prepared
                    setTimeout(() => this.selectMenuAndNotify());
                }
            }
        });

        this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
    }

    ngOnDestroy(): void {
        this._onRouteChange.unsubscribe();
        this._menuItemsSub.unsubscribe();
    }

    hoverItem($event): void {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        // TODO: get rid of magic 66 constant
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
    }

    toggleSubMenu($event): boolean {
        const submenu = jQuery($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }
}
