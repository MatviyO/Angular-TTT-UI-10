import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import {NavigationHelper} from '../../../../../common/utils';
import {INavigationHelper} from '../../../../../common/interfaces';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html',
  styleUrls: ['./baMenuItem.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class BaMenuItem {

    @Input() menuItem: any;
    @Input() child: boolean = false;

    @Output() itemHover = new EventEmitter<any>();
    @Output() toggleSubMenu = new EventEmitter<any>();

    constructor(
        @Inject(NavigationHelper) private _navigation: INavigationHelper,
    ) {
    }

    onHoverItem($event): void {
        this.itemHover.emit($event);
    }

    onToggleSubMenu($event, item): boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  navigate(): void {
      this._navigation.clear();
  }
}
