import {Component, ViewChild, Inject, Input, OnInit} from '@angular/core';
import {CompanyContactsConfig} from './contacts.config';
import {ListenerService} from '../../../../../../../common/services';
import {ConfirmComponent} from '../../../../../../../common/components/confirm';
import {IEditorConfig} from '../../../../../../../common/interfaces';
import {CompanyContacts} from '../../../../../../../core/model/properties';
import {StatesService} from '../../../../../../../core/data';
import {BaseEditableListDirective} from '../../../../../../../common/base-classes';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [CompanyContactsConfig],
})

export class CompanyContactsComponent extends BaseEditableListDirective<CompanyContacts> implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  // mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', 'x', /\d/, /\d/, /\d/, /\d/];
  mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  companyId: number;
  states = this.stateSvc.getStates();

  constructor(
    @Inject(CompanyContactsConfig) config: IEditorConfig<CompanyContacts>,
    private stateSvc: StatesService,
    private listenerSvc: ListenerService,
  ) {
    super(config);
    super.onDataSaved((x) => this.itemSaved(x));
  }

  ngOnInit(): any {
  }

  parsePhone(tell): string {
    // if (tell && tell.length === 16) {
    //     tell = tell.slice(0, 14);
    // }
    return tell;
  }

  load(compId: number, contacts: CompanyContacts[]): void {
    this.entities = contacts;
    this.companyId = compId;
    this.listenerSvc.notify(this.entities);
  }

  onSave(item: CompanyContacts, form): void {
    item.companyId = this.companyId;
    super.onSave(item, form);
  }

  itemSaved(contact: CompanyContacts): void {
    this.listenerSvc.notify(this.entities);
  }

  onDelete(item: CompanyContacts): void {
    const status = !item.isActive ? 'enable' : 'disable';
    this.confirm.show('confirm', `Are you sure you\'d like to ${status} this item?`)
      .then(result => {
        if (result) {
          super.delete(item);
        }
      });
  }

}
