import {Directive, HostBinding, OnInit} from '@angular/core';

import { BaThemeConfigProvider, isMobile } from '../../../theme';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appBaThemeRun]'
})
// tslint:disable-next-line:directive-class-suffix
export class BaThemeRunDirective implements OnInit{

  // tslint:disable-next-line:variable-name
  private _classes: Array<string> = [];
  @HostBinding('class') classesString: string;

  // tslint:disable-next-line:variable-name
  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  public ngOnInit(): void {
    this._assignTheme();
    this._assignMobile();
  }

  private _assignTheme(): void {
    this._addClass(this._baConfig.get().theme.name);
  }

  private _assignMobile(): void {
    if (isMobile()) {
      this._addClass('mobile');
    }
  }

  // tslint:disable-next-line:typedef
  private _addClass(cls: string) {
    this._classes.push(cls);
    this.classesString = this._classes.join(' ');
  }
}
