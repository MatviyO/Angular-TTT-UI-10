import {Component, ViewChild, Inject, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CommunicationCompanyConfig} from './communication-company.config';
import {CallReasonsService, CompanyContactsService, CompanyResourceService} from '../../../../../../core/data';
import {ConfirmComponent} from '../../../../../../common/components/confirm';
import {CallReason, Company, CompanyCommunicationHistory} from '../../../../../../core/model';
import {IEditorStateExt, IEditorStatefulConfig, IResourceService} from '../../../../../../common/interfaces';
import {BaseEditableListDirective} from '../../../../../../common/base-classes';


@Component({
  selector: 'app-communication-company',
  templateUrl: './communication-company.component.html',
  styleUrls: ['./communication-company.component.scss'],
  providers: [CommunicationCompanyConfig, CallReasonsService, CompanyResourceService, CompanyContactsService],
})

export class CommunicationCompanyComponent extends BaseEditableListDirective<CompanyCommunicationHistory> implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  @Input() activePage: boolean;
  @Output() onNavigate: EventEmitter<IEditorStateExt> = new EventEmitter<IEditorStateExt>();

  companies: Company[];
  callReasons: CallReason[];
  itemEdit: CompanyCommunicationHistory;
  originalItemEdit: CompanyCommunicationHistory;
  applId: number;
  num: number;
  editing = false;
  contacts: any;
  scrolled = 0;


  constructor(
    @Inject(CommunicationCompanyConfig) config: IEditorStatefulConfig<CompanyCommunicationHistory>,
    @Inject(CallReasonsService) private callReasonSvc: IResourceService<CallReason>,
    @Inject(CompanyResourceService) private companySvc: IResourceService<Company>,
  ) {
    super(config);
  }

  ngOnInit(): void {
  }

  load(id: number, companyHistories: CompanyCommunicationHistory[], data?: IEditorStateExt): void {
    if (this.entities.length > 0) {
      return;
    }
    this.callReasonSvc.query('', '', null, 'null', 'id;description;isActive')
      .then(res => this.callReasons = res)
      .catch((e) => this.onHttpError(e));

    this.companySvc.query('', '', null, 'Contacts', 'id;name;isActive;contacts[*].*')
      .then(res => {
        this.companies = res;
        if (data) {
          if (data.editingItem.id) {
            this.editItem(data.editingItem, data.itemIndex, data.itemBkp);
          } else {
            this.addHistory(data.editingItem);
          }
        }
      })
      .catch((e) => this.onHttpError(e));

    this.entities = companyHistories;
    this.applId = id;
  }

  navigate(itemEdit: CompanyCommunicationHistory): void {
    const data: IEditorStateExt = {
      editingItem: itemEdit,
      itemBkp: this.originalItemEdit,
      itemIndex: -1,
      section: 'commHist',
    };
    if (this.num >= 0) {
      data.itemIndex = this.num;
    }
    this.onNavigate.emit(data);
  }

  onSave(item: CompanyCommunicationHistory, form): void {
    if (form.valid) {
      window.scrollTo(0, this.scrolled);
      this.editing = false;
      item.applicationId = this.applId;
      super.onSave(item, form);
    } else {
      form._submitted = true;
      this.notificationSvc.warning('info', 'Please fill in required fields');
    }
  }

  companyChanged(clear?: boolean): void {
    if (!clear) {
      this.itemEdit.companyContactId = undefined;
    }
    this.contacts = this.companies.find(x => x.id === +this.itemEdit.companyId).contacts;
  }

  getCompanyId(id: number): string {
    if (this.companies && id) {
      const comp = this.companies.find(x => x.id === id);
      if (comp) {
        return comp.name;
      }
    }
  }

  editItem(item: CompanyCommunicationHistory, i: number, itemBkp?: CompanyCommunicationHistory): void {
    this.scrolling();
    if (itemBkp) {
      this.originalItemEdit = itemBkp;
    } else {
      this.originalItemEdit = Object.assign({}, item);
    }
    this.num = i;
    this.editing = true;
    this.contacts = this.companies.find(x => x.id === +item.companyId).contacts;
    this.itemEdit = Object.assign({}, item);
    super.edit(item);
  }

  addHistory(item?: CompanyCommunicationHistory): void {
    this.editing = true;
    this.num = null;
    this.contacts = [];
    if (item) {
      this.itemEdit = item;
      this.companyChanged(true);
    } else {
      this.itemEdit = new CompanyCommunicationHistory();
    }
  }

  cancelEdit(item: CompanyCommunicationHistory, i: number): void {
    this.scrolling(true);
    if (this.num >= 0) {
      this.num = null;
      this.entities[this.num] = this.originalItemEdit;
    } else {
      this.num = null;
      super.cancelEdit(item, i);
    }
  }

  onLoadMore(): any {
    if (this.activePage) {
      super.loadMore();
    }
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
