import { Component, Input } from '@angular/core';
// import { BaMsgCenterService } from './baMsgCenter.service';
import { BaThemeConfigProvider } from '../../theme.configProvider';
import { BaThemeConfig } from '../../theme.config';
import {TriggerService} from '../../../core/data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ba-msg-center',
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html',
})
// tslint:disable-next-line:component-class-suffix
export class BaMsgCenter {
  triggerDanger: any = [];
  triggerWarning: any = [];

  constructor(
    private dataTrg: TriggerService,
    // tslint:disable-next-line:variable-name
    private _baConfig: BaThemeConfigProvider,
    // tslint:disable-next-line:variable-name
    private _themaConfig: BaThemeConfig,
  ) {
    this.dataTrg.queryByCategory('All', '')
      .subscribe(
        res => {
          if (res) {
            res.forEach(item => {
              if (item.severity === 2) {
                this.triggerDanger.push(item);
              }
              if (item.severity === 1) {
                this.triggerWarning.push(item);
              }
            });
          }
        },
        err => { },
    );

  }

}
