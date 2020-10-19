import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BaseEditableListDirective} from '../../../common/base-classes';
import {MilitaryBranch} from '../../../core/model/properties';
import {MilitaryBranchConfig} from './military-branch.config';
import {IEditorConfig} from '../../../common/interfaces';
import {ConfirmComponent} from '../../../common/components/confirm';

@Component({
  selector: 'app-military-branch',
  templateUrl: './military-branch.component.html',
  styleUrls: ['./military-branch.component.scss'],
  providers: [MilitaryBranchConfig]
})
export class MilitaryBranchComponent extends BaseEditableListDirective<MilitaryBranch> implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  constructor(@Inject(MilitaryBranchConfig) config: IEditorConfig<MilitaryBranch>) {
    super(config);
  }

  ngOnInit(): any {
    super.ngOnInit();
  }
  onDelete(item: MilitaryBranch): void {
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
