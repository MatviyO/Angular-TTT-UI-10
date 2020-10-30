import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { HousingAllowanceDetailsConfig } from './housing-allowance.details.config';
import {DetailsWithTriggersDirective} from '../../../../common/base-classes';
import {
  EmploymentCompanyResourceService,
  MonthsService,
  ProfileResourceService,
  ProfileVeteranResourceService, TradesService
} from '../../../../core/data';
import {CompanyTrade, HousingAllowance, HousingAllowanceItem, Profile, Trade} from '../../../../core/model';
import {IEditorWithTriggersConfig, INavigationHelper, IResourceService} from '../../../../common/interfaces';
import {ConfirmComponent} from '../../../../common/components/confirm';
import {NavigationHelper} from '../../../../common/utils';
import {FileUploaderComponent} from '../../../../common/components/upload-file';


@Component({
  selector: 'app-housing-allowance-details',
  templateUrl: './housing-allowance.details.component.html',
  styleUrls: ['housing-allowance.details.component.scss'],
  providers: [HousingAllowanceDetailsConfig, MonthsService, TradesService, ProfileResourceService, ProfileVeteranResourceService, EmploymentCompanyResourceService],
})

export class HousingAllowanceDetailsComponent extends DetailsWithTriggersDirective<HousingAllowance> implements OnInit {
  @ViewChild(FileUploaderComponent) fileUploader: FileUploaderComponent;
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  trades: Trade[] = this.tradeSvc.getTrades();
  _items: any[] = [];
  canNotHousing: boolean;
  addNewField = false;
  _startDate: Date;
  // triggers: Trigger[];
  _months = this.monthsSvc.getMonths();

  companyTrade: CompanyTrade;

  constructor(
    @Inject(HousingAllowanceDetailsConfig) config: IEditorWithTriggersConfig<HousingAllowance>,
    @Inject(NavigationHelper) protected navigation: INavigationHelper,
    // @Inject(ProfileResourceService) private profileSvc: IResourceService<Profile>,
    @Inject(ProfileVeteranResourceService) private profileSvc: IResourceService<Profile>,
    @Inject(EmploymentCompanyResourceService) private employmentCompanySvc: IResourceService<any>,
    private tradeSvc: TradesService,
    private monthsSvc: MonthsService,
  ) {
    super(config);
    super.onDataLoaded((x) => this.dataLoaded(x));
    // super.onTriggerLoaded((x) => this.hasTrigger(x));
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  dataLoaded(data) {
    // debugger
    if (!data) {
      this.entity = new HousingAllowance();
      this.entity.employmentRecordId = +this.queryParams['id'];
      this._startDate = new Date();
      this.showLoadData = true;

      this.employmentCompanySvc.query(`id==${this.entity.employmentRecordId}`, '', [], 'Application,Stages.Status,Stages.Notes,Stages.Location,CompanyTrade.Company.Trades')
        .then(result => {
          if (result.length > 0) {
            this.entity.employmentRecord = result[0];
            this.companyTrade = result[0].companyTrade;
            this.navigation.addNavigation(`${this.queryParams['name']}`, `/profile/details/${result[0].applicationId}`);

            this.profileSvc.query(`id=${result[0].applicationId}`, '', [{ key: 'apt', value: 'CanHillerHousingAllowance' }, { key: 'apt', value: 'HillerEmploymentId' }])
              .then(res => {
                if (res.length > 0) {
                  if (!(res[0].properties && res[0].properties['CanHillerHousingAllowance'])) {
                    this.notificationSvc.warning('info', 'Housing allowance is not available');
                    this.canNotHousing = true;
                    this.showLoadData = false;
                    return;
                  }
                }
              })
              .catch(err => {
                this.canNotHousing = true;
                this.showLoadData = false;
                this.onHttpError(err);
              });
            this.showLoadData = false;
          }
        })
        .catch(err => {
          this.onHttpError(err);
          this.showLoadData = false;
        });

    } else {
      this.companyTrade = data.employmentRecord.companyTrade;
      this._startDate = data.startDate;
      if (data.employmentRecord && data.employmentRecord.application) {
        this.navigation.addNavigation(`${data.employmentRecord.application.firstName} ${data.employmentRecord.application.lastName}`,
          `/profile/details/${data.employmentRecord.applicationId}`);
      }
    }
  }

  // hasTrigger(triggers: Trigger[]): void {
  //     if (triggers) {
  //         if (triggers.find(x => x.mainObjectId === this.entity.id && x.objectId === null)) {
  //             this.entity.hasTrigger = true;
  //         }
  //     }
  // }

  onSave(item, form): void {
    event.returnValue = false;
    if (form.valid) {
      this.entity.startDate = this.formatedDate(this._startDate) as Date;

      let p: number[] = [];
      this.entity.items.map(x => {
        if (p.indexOf(x.period) < 0) {
          p.push(x.period);
        }
      });

      if (p.length != this.entity.items.length) {
        this.confirm.show('confirm', 'You are about to add duplicated record. Are you sure you would like to proceed?')
          .then(res => {
            if (res) {
              this._save();
            }
          });
      } else {
        this._save();
      }
    } else {
      form._submitted = true;
      this.notificationSvc.warning('info', 'Please fill in required fields');
    }
  }

  _save() {
    super.save()
      .then(res => {
        this.entity.employmentRecord.companyTrade = this.companyTrade;
        this.addNewField = false;
        if (this.entity.items.length === 1 && !this.entity.items[0].paperworkReceivedDate) {
          this.entity.items[0].editing = true;
        }

      })
      .catch(err => this.onHttpError(err));
  }

  formatedDate = (inDate: Date = null): string | Date => {
    if (inDate) {
      inDate = new Date(inDate);
      return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
    } else {
      return new Date();
    }
  }

  addField() {
    let _date: any;
    this.addNewField = true;
    // if (this.entity.items.length >= 6 && this.entity.employmentCompany.trade >= 3) {
    //     this.notificationSvc.warning('error', 'HVAC limit reached');
    //     return;
    // }
    // if (this.entity.items.length >= 12 && this.entity.employmentCompany.trade <= 2) {
    //     this.notificationSvc.warning('error', 'Plumbing/Electrical limit reached');
    //     return;
    // }
    if (this.entity.items.length === 0) {
      _date = new Date(this.entity.startDate).getUTCMonth() + 1;
    } else {
      _date = this.entity.items[this.entity.items.length - 1].period + 1;
    }
    if (_date > 12) {
      _date = 1;
    }
    const item = new HousingAllowanceItem();
    item.period = _date;
    item.editing = true;
    this.edit(item);
    this.entity.items.push(item);
  }

  edit(item: HousingAllowanceItem): void {
    this._items.push(Object.assign({}, item));
  }

  cancelEdit(item: HousingAllowanceItem, i: number): void {
    if (!item.id) {
      this.addNewField = false;
      this.entity.items.splice(this.entity.items.findIndex(x => x.period === item.period), 1);
      return;
    }
    const index = this._items.findIndex(x => x.id === item.id);
    if (index >= 0) {
      this.entity.items[i] = this._items[index];
      this._items[index].editing = false;
      this._items.splice(index, 1);

    }
  }

  getTrade(id: number): string {
    if (id > 0) {
      return this.tradeSvc.getTradesById(id);
    }
  }

  getMonthById(id: number): string {
    if (id) {
      return this.monthsSvc.getMonthById(id);
    } else {
      return '';
    }
  }
}
