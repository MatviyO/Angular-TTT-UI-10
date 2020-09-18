import {Directive, Input, Output, ElementRef, EventEmitter} from '@angular/core';

import 'jquery-slimscroll';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[baSlimScroll]'
})
// tslint:disable-next-line:directive-class-suffix
export class BaSlimScroll {

  // tslint:disable-next-line:ban-types
  @Input() public baSlimScrollOptions: Object;

  // tslint:disable-next-line:variable-name
  constructor(private _elementRef: ElementRef) {
  }

  ngOnChanges(changes) {
    this._scroll();
  }

  private _scroll() {
    this._destroy();
    this._init();
  }

  private _init() {
    // @ts-ignore
    jQuery(this._elementRef.nativeElement).slimScroll(this.baSlimScrollOptions);
  }

  private _destroy() {
    // @ts-ignore
    jQuery(this._elementRef.nativeElement).slimScroll({ destroy: true });
  }
}
