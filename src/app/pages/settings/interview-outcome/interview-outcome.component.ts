import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {InterviewOutcomeConfig} from './interview-outcome.config';
import {BaseEditableListDirective} from '../../../common/base-classes';
import {InterviewOutcome} from '../../../core/model/properties';
import {IEditorConfig} from '../../../common/interfaces';
import {ConfirmComponent} from '../../../common/components/confirm';

@Component({
  selector: 'app-interview-outcome',
  templateUrl: './interview-outcome.component.html',
  styleUrls: ['./interview-outcome.component.scss'],
  providers: [InterviewOutcomeConfig]
})
export class InterviewOutcomeComponent extends BaseEditableListDirective<InterviewOutcome>{

  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  constructor(
    @Inject(InterviewOutcomeConfig) config: IEditorConfig<InterviewOutcome>,
  ) {
    super(config);
  }

  onDelete(item: InterviewOutcome): void {
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
