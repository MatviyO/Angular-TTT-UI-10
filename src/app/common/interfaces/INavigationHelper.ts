export class NavigationItem {
    id: number;
    title: string;
    url: string;

    constructor(id: number, title: string, url: string) {
        this.id = id;
        this.title = title;
        this.url = url;
    }
}

export interface INavigationHelper {
    navs?: NavigationItem[];
    clear(): void;
    back(): void;
    addNavigation(title: string, url: string): void;
    navigate(item: NavigationItem): void;
    onChange(callback: (items: NavigationItem[]) => void): void;
}
