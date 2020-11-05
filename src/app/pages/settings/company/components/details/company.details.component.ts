import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { CompanyDetailsConfig } from './company.details.config';
import {DetailsStatefulDirective} from '../../../../../common/base-classes';
import {Company, CompanyAffiliate, CompanyCommunicationHistory, CompanyTrade, MilitaryBase} from '../../../../../core/model';
import {
  CommunicationHistoryResourceService,
  CompanyAffiliatesService,
  CompanyService,
  DiscountResourceService,
  TradesService
} from '../../../../../core/data';
import {Discount} from '../../../../../core/model/properties/discount';
import {CompanyCommunicationHistoryComponent} from './components/communication-history';
import {CountryStatesService, State} from '../../../../../core/data/country-state.service';
import {ConfirmComponent} from '../../../../../common/components/confirm';
import {AlternativeLocationsComponent} from './components/alternativeLocations';
import {IEditorStatefulConfig, IResourceService} from '../../../../../common/interfaces';
import {CompanyContactsComponent} from './components/contacts';
import {MilitaryBaseService} from '../../../military-base';
import {FileUploaderComponent} from '../../../../../common/components/upload-file';
import {EmploymentComponent} from './components/employments';


@Component({
  selector: 'app-company.details',
  templateUrl: './company.details.component.html',
  providers: [TradesService, CompanyService, DiscountResourceService, MilitaryBaseService, CompanyAffiliatesService, CompanyDetailsConfig, CommunicationHistoryResourceService],
  styleUrls: ['company.details.component.scss'],
})

export class CompanyDetailsComponent extends DetailsStatefulDirective<Company> implements OnInit {
  @ViewChild(AlternativeLocationsComponent) altLocation: AlternativeLocationsComponent;
  @ViewChild(CompanyContactsComponent) contact: CompanyContactsComponent;
  @ViewChild(CompanyCommunicationHistoryComponent) commHistory: CompanyCommunicationHistoryComponent;
  @ViewChild(FileUploaderComponent) fileUploader: FileUploaderComponent;
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  @ViewChild(EmploymentComponent) employment: EmploymentComponent;

  affiliates: CompanyAffiliate[];
  baseName: MilitaryBase[];
  companyHistories: CompanyCommunicationHistory[] = [];
  programs: any[] = this.tradesSvc.getTrades();
  countries = this.countrySvc.getCounries();
  borderRed: boolean = false;
  section: string;
  discountes: Discount[] = [];
  states: State[] = [];
  otherTrades: CompanyTrade[] = [];
  editOtherTradeIndex: number;
  beforeEditOtherTrade: CompanyTrade;
  newAnotherTrade: CompanyTrade;

  constructor(

    @Inject(CompanyDetailsConfig) config: IEditorStatefulConfig<Company>,
    @Inject(MilitaryBaseService) private baseNameSvc: IResourceService<MilitaryBase>,
    @Inject(CompanyAffiliatesService) private affiliatesSvc: IResourceService<CompanyAffiliate>,
    @Inject(CommunicationHistoryResourceService) private companyHistorySvc: IResourceService<CompanyCommunicationHistory>,
    @Inject(DiscountResourceService) private discountSvc: IResourceService<Discount>,
    private tradesSvc: TradesService,
    private location: Location,
    private countrySvc: CountryStatesService,
  ) {
    super(config);
    super.onDataLoaded((x) => this.dataLoaded(x));
    super.onDataSaved((x) => this.dataSaved(x));
    this.newAnotherTrade = { isActive: true, trade: 0 } as CompanyTrade;
  }


  validationMaxlength = (item: Company): number => item.country === 'US' ? 5 : 10;
  validationMinlength = (item: Company): number => item.country === 'US' ? 5 : 1;


  changeCompany(firstLoad: boolean = false) {
    if (this.entity.country) {
      const _country = this.countries.find(x => x.countryShortCode === this.entity.country);
      if (_country) { this.states = _country.regions; }
      if (!firstLoad) { this.entity.state = null; }
    } else {
      this.entity.state = null;
      this.states = [];
    }
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: any) => {
          if (params['key'] && params['section']) {
            this.section = params['section'];
          }
        },
      );

    super.ngOnInit();

    this.discountSvc.query()
      .then((res: Discount[]) => this.discountes = res);

    if (!this.queryParams.id) {
      this.entity.isActive = true;
    }

    if (this.queryParams.section === 'altLocations') {
      $('#loc').click();
    }
    if (this.queryParams.section === 'commHistory') {
      $('#commHistory').click();
    }
    if (this.queryParams.section === 'contacts') {
      $('#contacts').click();
    }

    this.affiliatesSvc.query()
      .then(res => { this.affiliates = res; })
      .catch(this.onHttpError);

    this.baseNameSvc.query()
      .then(data => this.baseName = data)
      .catch(this.onHttpError);


  }

  dataLoaded(data: Company) {
    if (this.entity.country) {
      this.changeCompany(true);
    }
    if (data) {
      this.setupChildren(data);
      this.otherTrades = data.trades.filter(x => x.trade < 1);
    }

    if (!data) {
      this.entity = new Company();
      this.entity.isActive = true;
    }
    return data;
  }

  onSave(form: { valid: boolean; _submitted: boolean; }): void {
    event.returnValue = false;
    if (form.valid) {
      this.entity.alternateLocations = null;
      if (this.entity.baseCloseById > 0) {
      } else {
        this.entity.baseCloseById = null;
        this.entity.baseCloseBy = null;
      }
      super.save();
    } else {
      form._submitted = true;
      this.showLoadData = false;
      this.notificationSvc.warning('info', 'Please fill in required fields');
    }
  }

  addOtherTrade(form: any): void {
    if (this.newAnotherTrade.name) {
      this.entity.trades.push(this.newAnotherTrade);
      this.otherTrades = this.entity.trades.filter(x => x.trade < 1);
      this.newAnotherTrade = new CompanyTrade(0);
      this.onSave(form);
    }
  }

  updateOtherTrade(item, form: any): void {
    const _index = this.entity.trades.findIndex(x => x.id === item.id);
    if (_index !== -1) {
      this.entity.trades[_index] = item;
      this.otherTrades = this.entity.trades.filter(x => x.trade < 1);
      item.editing = false;
      this.beforeEditOtherTrade = null;
      this.onSave(form);
    }
  }

  editOtherTrade(item: CompanyTrade): void {
    if (this.beforeEditOtherTrade) {
      this.cancelEditOtherTrade(this.beforeEditOtherTrade);
    }
    this.beforeEditOtherTrade = JSON.parse(JSON.stringify(item));
    item.editing = true;
  }

  cancelEditOtherTrade(item: CompanyTrade): void {
    const _beforeEditTrade = JSON.parse(JSON.stringify(this.beforeEditOtherTrade));
    if (_beforeEditTrade) {
      const _index = this.entity.trades.findIndex(x => x.id === _beforeEditTrade.id);
      _beforeEditTrade.editing = false;
      this.entity.trades[_index] = _beforeEditTrade;
      this.otherTrades = this.entity.trades.filter(x => x.trade < 1);
    }
    item.editing = false;
    this.beforeEditOtherTrade = null;
  }

  dataSaved = (x: Company): void => { this.setupChildren(x); };

  setupChildren(c: Company): void {
    if (c.id) {
      this.otherTrades = this.entity.trades.filter(x => x.trade < 1);
      this.altLocation.load(c.id, c.alternateLocations);
      this.contact.load(c.id, c.contacts);
      this.companyHistorySvc.query(`companyId==${c.id}`)
        .then(data => {
          this.companyHistories = data;
          this.commHistory.load(c.id, this.companyHistories, this.state ? this.state.data : null);
        })
        .catch(this.onHttpError);
    }
    if (this.section === 'commHistory') {
      $('#commHistory').click();
    }
  }

  loadEmployments = () => {
    this.employment.load(this.entity.id, this.entity.name);
  }

  isTradeActive = (tradeType: number): boolean => {
    if (this.entity.trades && this.entity.trades.length > 0) {
      const _trade = this.entity.trades.find(x => x.trade === tradeType);
      return _trade && _trade.isActive;
    } else {
      return false;
    }
  }

  changeTrade = (tradeType: number): void => {
    const index = this.entity.trades.findIndex(x => x.trade === tradeType);
    if (index >= 0) {
      this.entity.trades[index].isActive = !this.entity.trades[index].isActive;
    } else {
      this.entity.trades.push({ trade: tradeType, isActive: true } as CompanyTrade);
    }
  }

  cancel = (): void => { this.location.back(); };

}

