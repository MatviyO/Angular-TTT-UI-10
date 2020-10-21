import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {IEditorConfig} from '../../../common/interfaces';
import {EmploymentStatus } from '../../../core/model/properties';
import {ConfirmComponent} from '../../../common/components/confirm';
import {EmploymentStatusConfig} from './employment-status.config';
import {BaseEditableListDirective} from '../../../common/base-classes';

@Component({
  selector: 'app-employment-status',
  templateUrl: './employment-status.component.html',
  styleUrls: ['./employment-status.component.scss'],
  providers: [EmploymentStatusConfig]
})
export class EmploymentStatusComponent extends BaseEditableListDirective<EmploymentStatus>  {

  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  constructor(
    @Inject(EmploymentStatusConfig) config: IEditorConfig<EmploymentStatus>,
  ) {
    super(config);
  }

  onDelete(item: EmploymentStatus): void {
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
