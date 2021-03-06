import {Component, Inject, ViewChild} from '@angular/core';
import {ConfirmComponent} from '../../../common/components/confirm';
import {Reference} from '../../../core/model/properties';
import {ReferencesConfig} from './references.config';
import {IEditorConfig} from '../../../common/interfaces';
import {BaseEditableListDirective} from '../../../common/base-classes';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'],
  providers: [ReferencesConfig]
})
export class ReferencesComponent extends BaseEditableListDirective<Reference>  {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  constructor(
    @Inject(ReferencesConfig) config: IEditorConfig<Reference>,
  ) {
    super(config);
  }

  onDelete(item: Reference): void {
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
