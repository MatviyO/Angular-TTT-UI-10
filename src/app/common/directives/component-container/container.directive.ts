import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[app-component-container]',
})
export class ContainerDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
