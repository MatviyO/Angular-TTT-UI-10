import {Component, Inject, ViewChild} from '@angular/core';
import {BaseEditableListDirective} from '../../../common/base-classes';
import {InterviewType} from '../../../core/model/properties';
import {ConfirmComponent} from '../../../common/components/confirm';
import {InterviewTypeConfig} from './interview-type.config';
import {IEditorConfig} from '../../../common/interfaces';

@Component({
  selector: 'app-interview-type',
  templateUrl: './interview-type.component.html',
  styleUrls: ['./interview-type.component.scss'],
  providers: [InterviewTypeConfig]
})
export class InterviewTypeComponent extends BaseEditableListDirective<InterviewType> {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  constructor(
    @Inject(InterviewTypeConfig) config: IEditorConfig<InterviewType>,
  ) {
    super(config);
  }

  onDelete(item: InterviewType): void {
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
