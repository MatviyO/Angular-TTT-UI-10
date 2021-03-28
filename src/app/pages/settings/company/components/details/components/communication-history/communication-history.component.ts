import { Component, ViewChild, Inject, OnInit, Output, EventEmitter } from '@angular/core';


import { CompanyCommunicationHistoryConfig } from './communication-history.config';
import { ListenerService, ObservableService } from '../../../../../../../common/services';
import { IEditorConfig, IEditorStateExt, INavigationHelper, IResourceService } from '../../../../../../../common/interfaces';
import { CallReason, CompanyCommunicationHistory, CompanyContacts } from '../../../../../../../core/model/properties';
import { ConfirmComponent } from '../../../../../../../common/components/confirm';
import { NavigationHelper } from '../../../../../../../common/utils';
import { CallReasonsService, StatesService } from '../../../../../../../core/data';
import { BaseEditableListDirective } from '../../../../../../../common/base-classes';
import { Profile } from '../../../../../../../core/model';
import { Router } from '@angular/router';
import {ReminderConfig} from '../../../../../../../theme/components/reminder/reminder.component';
// import { ReminderComponent } from 'src/app/core/components/reminder/reminder.component';

@Component({
  selector: 'app-communication-history',
  templateUrl: './communication-history.component.html',
  styleUrls: ['./communication-history.component.scss'],
  providers: [CompanyCommunicationHistoryConfig, CallReasonsService, ObservableService],
})

export class CompanyCommunicationHistoryComponent extends BaseEditableListDirective<CompanyCommunicationHistory> implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  // @ViewChild(ReminderComponent) reminder: ReminderComponent;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNavigate: EventEmitter<IEditorStateExt> = new EventEmitter<IEditorStateExt>();

  // mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  editing = false;
  companyId: number;
  num: number;
  callReasons: CallReason[];
  itemEdit: CompanyCommunicationHistory;
  originalItemEdit: CompanyCommunicationHistory;
  contacts: CompanyContacts[] = [];
  states = this.stateSvc.getStates();
  scrolled = 0;

  constructor(
    private router: Router,
    @Inject(CompanyCommunicationHistoryConfig) config: IEditorConfig<CompanyCommunicationHistory>,
    @Inject(CallReasonsService) private callReasonSvc: IResourceService<CallReason>,
    @Inject(NavigationHelper) protected navigation: INavigationHelper,
    private stateSvc: StatesService,
    private listenerSvc: ListenerService,
    private observableSvc: ObservableService,
  ) {
    super(config);
    this.listenerSvc.addListeners((x) => this.contactsChanged(x));
  }

  ngOnInit(): any {
    this.callReasonSvc.query()
      .then(data => this.callReasons = data)
      .catch((e) => this.onHttpError(e));

  }

  getReminderConfig = (item: CompanyCommunicationHistory = null): ReminderConfig => {
      return {
          category: 'Company',
          section: 'commHistory',
          url: this.router.url,
          element: item,
      } as ReminderConfig;
  }


  load(companyId: number, companyHistories: CompanyCommunicationHistory[], data?: IEditorStateExt): void {
    if (companyId > 0) {
      this.entities = companyHistories;
      this.companyId = companyId;
      this.restore(data);
    }
    if (data) {
      if (data.editingItem.id) {
        this.editItem(data.editingItem, data.itemIndex, data.itemBkp);
      } else {
        this.addHistory(data.editingItem);
      }
    }
  }

  restore(data?: IEditorStateExt): void {
    if (data && data.editingItem) {
      this.itemEdit = data.editingItem;
      super.edit(this.itemEdit);
      this.editing = true;
      this.num = data.itemIndex;
      this._items.push(data.itemBkp);
    }
  }

  contactsChanged(contacts: CompanyContacts[]): void {
    this.contacts = contacts;
  }

  onSave(item: CompanyCommunicationHistory, form): void {
    item.companyId = this.companyId;
    if (item.application) {
      item.applicationId = item.application.id;
    }
    if (form.valid) {
      this.editing = false;
      const cont = this.contacts.find(x => x.id === +item.companyContactId);
      const call = this.callReasons.find(x => x.id === +item.companyCallReasonId);
      if (item.id) {
        item.callReason = call;
        item.companyCallReasonId = +call.id;
        item.contact = cont;
        item.companyContactId = +cont.id;
      }
    }
    super.onSave(item, form);
  }

  editItem(item: CompanyCommunicationHistory, i: number, itemBkp?: CompanyCommunicationHistory): void {
    this.scrolling();
    if (itemBkp) {
      this.originalItemEdit = itemBkp;
    } else {
      this.originalItemEdit = Object.assign({}, item);
    }
    this.num = i;
    this.itemEdit = Object.assign({}, item);
    super.edit(item);
  }

  addHistory(item?: CompanyCommunicationHistory): any {
    this.editing = true;
    this.num = null;
    if (item) {
      this.itemEdit = item;
    } else {
      this.itemEdit = new CompanyCommunicationHistory();
    }
  }

  // tslint:disable-next-line:variable-name
  cancelEdit(item: CompanyCommunicationHistory, _num: number): void {
    this.scrolling(true);
    if (this.num >= 0) {
      this.entities[this.num] = this.originalItemEdit;
      this.num = null;
    } else {
      super.cancelEdit(item, _num);
      this.num = null;
    }
  }

  observableSource(keyword: any): Profile {
    return this.observableSvc.observableSourceProfile.bind(keyword);
  }

  navigate(itemEdit: CompanyCommunicationHistory): void {
    const data: IEditorStateExt = {
      editingItem: itemEdit,
      itemBkp: this.originalItemEdit,
      itemIndex: -1,
      section: 'commHistory',
    };
    if (this.num >= 0) {
      data.itemIndex = this.num;
    }
    this.onNavigate.emit(data);
  }

  scrolling(back?: boolean): void {
    if (back) {
      window.scrollTo(0, this.scrolled);
    } else {
      this.scrolled = (window.pageYOffset || document.documentElement.scrollTop) + 300;
      window.scrollTo(0, 0);
    }
  }

}
