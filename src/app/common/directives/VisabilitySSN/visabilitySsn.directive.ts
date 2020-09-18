import { Directive, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, HostListener, HostBinding } from '@angular/core';


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[visabilitySsn]',

})

export class VisabilitySsnDirective {
    // @Input() value: any;

    @HostListener('focus') onFocus() {
        this.showSsn();
    }

    @HostListener('focusout') onFocusOut() {
        this.hideSsn();
    }

    constructor(private _el: ElementRef) {
        this.hideSsn();
    }

    private showSsn() {
        this._el.nativeElement.type = 'text';
    }
    
    hideSsn() {
        this._el.nativeElement.type = 'password';
    }

}
