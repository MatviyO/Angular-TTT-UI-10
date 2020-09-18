import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, Type, ComponentRef } from '@angular/core';

import { ContainerDirective } from '../../directives';

@Component({
    selector: 'app-editor',
    template: `<ng-template app-component-container></ng-template>`,
})
export class EditorComponent {

    @ViewChild(ContainerDirective) compHost: ContainerDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    loadComponent(component: Type<any>): ComponentRef<any> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const viewContainerRef = this.compHost.viewContainerRef;
        viewContainerRef.clear();
        return viewContainerRef.createComponent(componentFactory);
    }
}
