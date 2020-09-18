import { Injectable } from '@angular/core';

import { BaThemeConfigProvider } from './theme.configProvider';
import { colorHelper } from './theme.constants';

@Injectable()
export class BaThemeConfig {

  // tslint:disable-next-line:variable-name
  constructor(private _baConfig: BaThemeConfigProvider) {}

  // tslint:disable-next-line:typedef
  config() {}
}
