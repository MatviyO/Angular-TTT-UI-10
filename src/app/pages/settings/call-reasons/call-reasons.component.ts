import {Component, Inject, ViewChild} from '@angular/core';
import {CallReasonsConfig} from './call-reasons.config';
import {ConfirmComponent} from '../../../common/components/confirm';
import {CallReason} from '../../../core/model/properties';
import {IEditorConfig} from '../../../common/interfaces';
import {BaseEditableListDirective} from '../../../common/base-classes';

@Component({
  selector: 'app-call-reasons',
  templateUrl: './call-reasons.component.html',
  styleUrls: ['./call-reasons.component.scss'],
  providers: [CallReasonsConfig],
})
export class CallReasonsComponent extends BaseEditableListDirective<CallReason>   {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  constructor(
    @Inject(CallReasonsConfig) config: IEditorConfig<CallReason>,
  ) {
    super(config);
  }

  onDelete(item: CallReason): void {
    const status = !item.isActive ? 'enable' : 'disable';
    this.confirm.show('confirm', `Are you sure you\'d like to ${status} this item?`)
      .then(result => {
        if (result) {
          if (item.isActive) {
            item.isActive = false;
          } else {
            item.isActive = true;
          }
          super.save(item);
        }
      });

  }

}
