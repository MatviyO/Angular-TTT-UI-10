import { Component, OnInit, Inject } from '@angular/core';
import { Router, Params } from '@angular/router';
import {CompanyAffiliate} from '../../../../../core/model/properties';
import {Company} from '../../../../../core/model';
import {CompanyAffiliatesService, StatesService, TradesService} from '../../../../../core/data';
import {CompanyListConfig} from './company.list.config';
import {IComponentConfig, IResourceService} from '../../../../../common/interfaces';
import {CountryStatesService, State} from '../../../../../core/data/country-state.service';
import {BaseSortableListDirective} from '../../../../../common/base-classes';


@Component({
    selector: 'app-company.list',
    templateUrl: './company.list.component.html',
    providers: [TradesService, StatesService, CompanyAffiliatesService, CompanyListConfig],
    styleUrls: ['company.list.component.scss'],
})

export class CompanyListComponent extends BaseSortableListDirective<Company> implements OnInit {

    companies: any;
    programs: any[];
    affiliates: CompanyAffiliate[];
    trades = this.tradesSvc.getTrades();
    countries = this.countrySvc.getCounries();
    states: State[] = [];

    constructor(
        @Inject(CompanyListConfig) config: IComponentConfig<Company>,
        @Inject(CompanyAffiliatesService) protected affiliatesSvc: IResourceService<CompanyAffiliate>,
        private tradesSvc: TradesService,
        private countrySvc: CountryStatesService,
    ) {
        super(config);
    }

    ngOnInit(): void {
        this.filter.active = true;

        super.ngOnInit();

        this.affiliatesSvc.query('', '', null, 'null', 'id;description;isActive')
            .then(res => { this.affiliates = res; })
            .catch((e) => this.onHttpError(e));
    }

    changeCompany(firstLoad: boolean = false): any {
        if (this.filter.country) {
            const _country = this.countries.find(x => x.countryShortCode === this.filter.country);
            if (_country) { this.states = _country.regions; }
            if (!firstLoad) { this.filter.state = null; }
        } else {
            this.filter.state = null;
            this.states = [];
        }
    }

    getFilterFormatted(): string {
        let filterStr = '';

        if (filterStr) { filterStr += ' and '; }
        if (this.filter.prospect) {
            filterStr += 'isProspect==true';
        } else {
            filterStr += 'isProspect==false';
        }
        if (filterStr) { filterStr += ' and '; }
        if (this.filter.active) {
            filterStr += 'isActive==true';
        } else {
            filterStr += 'isActive==false';
        }
        if (this.filter.name) {

            if (filterStr) { filterStr += ' and '; }
            const words = this.filter.name.split(' ');
            let fName = '';
            words.forEach((w: string) => {
                if (w) {
                    if (fName) { fName += ' and '; }
                    fName += `name.contains("${this.replaceSpecialCharacters(w)}")`;
                }
            });
            filterStr += `(${fName})`;
        }
        if (this.filter.contactName) {
            if (filterStr) { filterStr += ' and '; }
            if (this.filter.contactName) {
                const words = this.filter.contactName.split(' ');
                let fName = '';
                words.forEach(w => {
                    if (fName) { fName += ' or '; }
                    fName += `contacts.any(firstName.contains("${w}")) or contacts.any(lastName.contains("${w}"))`;
                });
                filterStr += `(${fName})`;
            }
        }
        if (this.filter.contactEmail) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `contacts.any(email.contains("${this.filter.contactEmail}"))`;
        }
        if (this.filter.affiliateId > 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `affiliateId==${this.filter.affiliateId}`;
        }
        if (this.filter.city) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `city.contains("${this.filter.city}")`;
        }
        if (this.filter.trade && this.filter.trade !== 'undefined') {
            if (filterStr) { filterStr += ' and '; }
            if (this.filter.trade === 'otherTrades') {
                filterStr += `trades.Any(trade=="0" or trade=="-1")`;
            } else {
                filterStr += `trades.Any(trade=="${this.filter.trade}")`;
            }
        }
        if (this.filter.country && this.filter.country !== 'undefined') {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `country=="${this.filter.country}"`;
        }
        if (this.filter.state && this.filter.state !== 'undefined') {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `state=="${this.filter.state}"`;
        }
        return filterStr;
    }

    getTradesById = (id: number): string => this.tradesSvc.getTradesById(id);
}
