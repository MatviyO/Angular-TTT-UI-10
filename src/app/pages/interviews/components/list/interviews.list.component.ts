import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { InterviewsListConfig } from './interviews.list.config';
import * as moment from 'moment';
import {CompanyResourceService, InterviewOutcomeService, InterviewStatusHelper, StatesService, TradesService} from '../../../../core/data';
import {Company, CompanyTrade, InterviewOutcome, InterviewRecord, InterviewStageV2} from '../../../../core/model';
import {CountryStatesService} from '../../../../core/data/country-state.service';
import {IListWithTriggersConfig, IResourceService} from '../../../../common/interfaces';
import {AddNewItemComponent} from '../../../../common/components/add-new-item/add-new-item.component';
import {BaseSortableListWithTriggersDirective} from '../../../../common/base-classes';

@Component({
    selector: 'app-interviews-list',
    templateUrl: './interviews.list.component.html',
    styleUrls: ['interviews.list.component.scss'],
    providers: [InterviewsListConfig, CountryStatesService,
      CompanyResourceService, StatesService, InterviewOutcomeService, InterviewStatusHelper],
})
export class InterviewsListComponent extends BaseSortableListWithTriggersDirective<InterviewRecord> implements OnInit {
    @ViewChild(AddNewItemComponent) addNewItem: AddNewItemComponent;
    companies: Company[] = [];
    outcomes: InterviewOutcome[];
    states = this.stateSvc.getStates();
    trades: any[] = this.tradesSvc.getTrades();
    date = new Date();

    constructor(
        private stateSvc: StatesService,
        private tradesSvc: TradesService,
        private statusHelper: InterviewStatusHelper,
        private countryStateSvc: CountryStatesService = new CountryStatesService(),
        @Inject(InterviewsListConfig) private config: IListWithTriggersConfig<InterviewRecord>,
        @Inject(CompanyResourceService) private companySvc: IResourceService<Company>,
        @Inject(InterviewOutcomeService) private interviewOutcomeSvc: IResourceService<InterviewOutcome>,
    ) {
        super(config);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.companySvc.query('', '', null, 'null', 'id;name;isActive')
            .then(res => this.companies = res)
            .catch((e) => this.onHttpError(e));

        this.interviewOutcomeSvc.query('', '', null, 'null', 'id;description;isActive')
            .then(res => this.outcomes = res)
            .catch((e) => this.onHttpError(e));
    }

    getTradeOfCompany = (company: CompanyTrade): string => {
        if (company) {
            return company.trade > 0 ? this.tradesSvc.getTradesById(company.trade) : company.name;
        }
        return '';
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
            if (filterStr) { filterStr += ' and '; }
            const words = this.filter.name.split(' ');
            let fName = '';
            words.forEach( (w) => {
                if (fName) { fName += ' and '; }
                fName += `(application.firstName.contains("${w}") or application.lastName.contains("${w}"))`;
            });
            filterStr += `(${fName})`;
        }
        if (this.filter.companyId >= 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Cast("EmploymentRecord").CompanyTrade.companyId="${this.filter.companyId}"`;
        }
        if (this.filter.trade) {
            if (filterStr) { filterStr += ' and '; }
            const _trade = +this.filter.trade === -10 ? 0 : this.filter.trade;
            filterStr += `Cast("EmploymentRecord").CompanyTrade.Trade="${_trade}"`;
        }
        if (this.filter.hasOutcome === null) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Stages.Any(Cast("InterviewStage").interviewOutcomeId = null)`;
        }
        if (this.filter.hasOutcome) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Stages.Any(Cast("InterviewStage").interviewOutcomeId > 0)`;
        }
        if (this.filter.outcomeId > 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Stages.Any(Cast("InterviewStage").interviewOutcomeId = "${this.filter.outcomeId}")`;
        }
        if (+this.filter.outcomeId === -1) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Stages.Any(Cast("InterviewStage").interviewOutcomeId = null and Cast("InterviewStage").date <= "${this.formatDate(this.date)}")`;
        }
        if (+this.filter.outcomeId === -2) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Stages.Any(Cast("InterviewStage").interviewOutcomeId = null and Cast("InterviewStage").date > "${this.formatDate(this.date)}")`;
        }
        if (+this.filter.outcomeId === -3) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Stages.Any(Cast("InterviewStage").interviewOutcomeId = null and Cast("InterviewStage").date <= "${this.formatDate(this.date)}" and Cast("InterviewStage").date > "${this.formatDate(this.date)}")`;
        }
        if (this.filter.dateFrom) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Stages.Any(Cast("InterviewStage").date >= "${this.filter.dateFrom}")`;
        }
        if (this.filter.dateTo) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `Stages.Any(Cast("InterviewStage").date <= "${this.filter.dateTo}")`;
        }
        return filterStr;
    }

    getStatusProcess(stages: InterviewStageV2[]): string {
        const _outccome = stages.find(x => !!x.interviewOutcome);
        if (_outccome) {
            return `${_outccome.interviewOutcome.description} on ${moment(_outccome.date).format('L')} `;
        } else {
            return this.statusHelper.get(stages).statusFormatted;
        }
    }

    getTradeById(id: number, company: Company): string {
        if (id < 0) {
            return company.otherTrades;
        }
        return this.tradesSvc.getTradesById(id);
    }

    formatDate(d: Date): string {
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }
}
