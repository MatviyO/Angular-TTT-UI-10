import {Component, Inject, ViewChild} from '@angular/core';
import {ConfirmComponent} from '../../../common/components/confirm';
import {Feedback} from '../../../core/model/properties';
import {IEditorConfig} from '../../../common/interfaces';
import {FeedbacksConfig} from './feedbacks.config';
import {BaseEditableListDirective} from '../../../common/base-classes';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
  providers: [FeedbacksConfig],
})
export class FeedbacksComponent extends BaseEditableListDirective<Feedback>  {

  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  constructor(
    @Inject(FeedbacksConfig) config: IEditorConfig<Feedback>,
  ) {
    super(config);
  }

  onDelete(item: Feedback): void {
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
