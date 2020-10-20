import {Component, Inject, ViewChild} from '@angular/core';
import {ConfirmComponent} from '../../../common/components/confirm';
import {ExitReason} from '../../../core/model/properties';
import {IEditorConfig} from '../../../common/interfaces';
import {ExitReasonsConfig} from './exit-reasons.config';
import {BaseEditableListDirective} from '../../../common/base-classes';

@Component({
  selector: 'app-exit-reasons',
  templateUrl: './exit-reasons.component.html',
  styleUrls: ['./exit-reasons.component.scss'],
  providers: [ExitReasonsConfig],
})
export class ExitReasonsComponent extends BaseEditableListDirective<ExitReason>  {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  constructor(
    @Inject(ExitReasonsConfig) config: IEditorConfig<ExitReason>,
  ) {
    super(config);
  }

  onDelete(item: ExitReason): void {
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
