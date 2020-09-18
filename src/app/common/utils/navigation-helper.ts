import { Injectable } from '@angular/core';

import { INavigationHelper, NavigationItem } from '../interfaces';


@Injectable()
export class NavigationHelper implements INavigationHelper {
    navs: NavigationItem[] = [];
    private listeners: ((items: NavigationItem[]) => void)[] = [];

    clear(): void {
        this.navs = [];
        this.listeners.forEach(cb => cb(this.navs));
    }

    back(): void {
        if (this.navs.length > 0) {
            this.navs.splice(this.navs.length - 1, 1);
            this.listeners.forEach(cb => cb(this.navs));
        }
    }

    addNavigation(title: string, url: string): void {
        const exist = this.navs.find(x => x.url === url);
        if (!exist) {
            this.navs.push(new NavigationItem(this.navs.length + 1, title, url));
            this.listeners.forEach(cb => cb(this.navs));
        }
    }

    navigate(item: NavigationItem): void {
        const index = this.navs.findIndex(x => x.id === item.id);
        this.navs.splice(index, this.navs.length - index);
        this.listeners.forEach(cb => cb(this.navs));
    }

    onChange(callback: (items: NavigationItem[]) => void): void {
        this.listeners.push(callback);
    }


}
