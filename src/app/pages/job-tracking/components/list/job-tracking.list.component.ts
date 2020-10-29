import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { JobTrackingListConfig } from './job-tracking.list.config';
import {CompanyResourceService, EmploymentStatusService, NonPlacementReasonService, TradesService} from '../../../../core/data';
import {
  Company,
  CompanyTrade,
  EmploymentRecord,
  EmploymentStageV2,
  EmploymentStatus,
  Feedback,
  NonPlacementReason,
  Trade
} from '../../../../core/model';
import {CountryStatesService} from '../../../../core/data/country-state.service';
import {IComponentConfig, IResourceService} from '../../../../common/interfaces';
import {AddNewItemComponent} from '../../../../common/components/add-new-item/add-new-item.component';
import {BaseSortableListDirective} from '../../../../common/base-classes';


@Component({
    selector: 'app-job-tracking-list',
    templateUrl: './job-tracking.list.component.html',
    styleUrls: ['job-tracking.list.component.scss'],
    providers: [JobTrackingListConfig, CountryStatesService, NonPlacementReasonService],
})

export class JobTrackingListComponent extends BaseSortableListDirective<any> implements OnInit {
    @ViewChild(AddNewItemComponent) addNewItem: AddNewItemComponent;

    trades: Trade[] = this.tradesSvc.getTrades();
    employmentStatus: EmploymentStatus[] = [];
    nonEmploymentStatus: NonPlacementReason[] = [];
    employments: EmploymentRecord[] = [];
    feedbacks: Feedback[] = [];
  // tslint:disable-next-line:variable-name
    _companies: Company[] = [];
    _order: string;


    constructor(
        @Inject(JobTrackingListConfig) config: IComponentConfig<EmploymentRecord>,
        @Inject(CompanyResourceService) private companySvc: IResourceService<Company>,
        @Inject(EmploymentStatusService) private employmentStatusSvc: IResourceService<EmploymentStatus>,
        @Inject(NonPlacementReasonService) private nonEmploymentStatusSvc: IResourceService<NonPlacementReason>,
        private tradesSvc: TradesService,
        private countryStateSvc: CountryStatesService = new CountryStatesService(),
    ) {
        super(config);
      // tslint:disable-next-line:variable-name
        super.onDataLoaded((_data, res) => this.dataLoaded(res));
    }

    ngOnInit(): void {
        this._order = 'startDate desc';
        super.ngOnInit();

        this.companySvc.query('', '', null, 'null', 'id;name;isActive')
            .then(res => this._companies = res)
            .catch((e) => this.onHttpError(e));

        this.employmentStatusSvc.query('', '', null, 'null', 'id;description;isActive;type')
            .then(res => this.employmentStatus = res)
            .catch((e) => this.onHttpError(e));

        this.nonEmploymentStatusSvc.query('', '', null, 'null', 'id;description;isActive;type')
            .then(res => this.nonEmploymentStatus = res)
            .catch((e) => this.onHttpError(e));
    }

    dataLoaded = (response: any) => {
        // this.generateEntitiesList(response);
    }

    getTradeOfCompany = (company: CompanyTrade): string => {
        if (company) {
            return company.trade > 0 ? this.tradesSvc.getTradesById(company.trade) : company.name;
        }
        return '';
    }

    getNonEmploymentReasonName = (id: number): string => {
        const _reason = this.nonEmploymentStatus.find(x => x.id === id);
        return _reason ? _reason.description : '';
    }

    getFullAddress = (option: any): string => {
        let _address = ``;
        if (option) {
            if (option.country) {
                const _country = this.countryStateSvc.getFullCountryName(option.country);
                if (_country) {
                    _address += ` ${_country}`;
                    if (option.state) {
                        const _state = this.countryStateSvc.getFullStateName(option.country, option.state);
                        if (_state) {
                            _address += ` | ${_state}`;
                        }
                    }
                }
            }
            if (option.city) { _address += ` | ${option.city}`; }
            if (option.address) { _address += ` | ${option.address}`; }
            if (option.zip) { _address += ` | ${option.zip}`; }
        }
        return _address;
    }

    showWindow = () => this.addNewItem.show();

    getFilterFormatted(): string {
        let filterStr = '';
        if (this.filter.name) {
            const words = this.filter.name.split(' ');
            let fName = '';
            words.forEach((w: string) => {
                if (w) {
                    if (fName) { fName += ' and '; }
                    fName += `(application.firstName.contains("${w}") or application.lastName.contains("${w}"))`;
                }
            });
            filterStr += `(${fName})`;
        }
        if (this.filter.companyId > 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Cast("EmploymentRecord").CompanyTrade.companyId="${this.filter.companyId}"`;
        }
        if (this.filter.trade) {
            if (filterStr) { filterStr += ' and '; }
            const _trade = +this.filter.trade === -10 ? 0 : this.filter.trade;
            filterStr += `Cast("EmploymentRecord").CompanyTrade.Trade="${_trade}"`;
        }

        if (this.filter.ageGroupp === '1') {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `application.age > 17 and application.age < 22`;
        }
        if (this.filter.ageGroupp === '2') {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `application.age > 21 and application.age < 25`;
        }
        if (this.filter.ageGroupp === '3') {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `application.age > 24 and application.age < 29`;
        }
        if (this.filter.ageGroupp === '4') {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `application.age > 28`;
        }

        return filterStr;
    }

    getLatestStage = (stages: EmploymentStageV2[]): EmploymentStageV2 => {
        if (stages && stages.length > 0) {
            stages = stages.filter(x => x.recordType !== 'InterviewStage');
          // tslint:disable-next-line:variable-name
            const _stages = stages.sort((b, a) => a.index - b.index)
              .sort((b, a) => Date.parse((a.date as string)
                .split('/').reverse().join('-')) - Date.parse((b.date as string)
                .split('/').reverse().join('-')));
            return _stages[0];
        }
        return new EmploymentStageV2();
    }

    getTradeById(id: number, company: Company): string {
        if (id < 0) {
            return company.otherTrades;
        }
        return this.tradesSvc.getTradesById(id);
    }

}

