import {Component, Inject, OnInit} from '@angular/core';
import {CompanyListConfig} from './company.list.config';
import {BaseSortableListDirective} from '../../../../../common/base-classes';
import {Company, CompanyAffiliate} from '../../../../../core/model';
import {IComponentConfig, IResourceService} from '../../../../../common/interfaces';
import {CompanyAffiliatesService, TradesService} from '../../../../../core/data';
import {CountryStatesService, State} from '../../../../../core/data/country-state.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  providers: [CompanyListConfig]
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
  }

  getFilterFormatted(): string {
    return '';
  }

}
