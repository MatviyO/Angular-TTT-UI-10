import { Component, Inject, ViewChild } from '@angular/core';
import { HousingAllowanceListConfig } from './housing-allowance.list.config';
import {IListWithTriggersConfig} from '../../../../common/interfaces';
import {TradesService} from '../../../../core/data';
import {AddNewItemComponent} from '../../../../common/components/add-new-item/add-new-item.component';
import {HousingAllowance} from '../../../../core/model';
import {BaseSortableListWithTriggersDirective} from '../../../../common/base-classes';

@Component({
  selector: 'app-housing-allowance-list',
  templateUrl: './housing-allowance.list.component.html',
  styleUrls: ['housing-allowance.list.component.scss'],
  providers: [HousingAllowanceListConfig, TradesService],
})

export class HousingAllowanceListComponent extends BaseSortableListWithTriggersDirective<HousingAllowance> {
  @ViewChild(AddNewItemComponent) addNewItem: AddNewItemComponent;
  trades: any[] = this.tradeSvc.getTrades();
  filterNewItem = `type="3" or type="2"`;

  constructor(
    @Inject(HousingAllowanceListConfig) config: IListWithTriggersConfig<HousingAllowance>,
    private tradeSvc: TradesService,
  ) {
    super(config);
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
          fName += `(employmentRecord.application.firstName.contains("${w}") or employmentRecord.application.lastName.contains("${w}"))`;
        }
      });
      filterStr += `(${fName})`;
    }
    if (this.filter.trade && this.filter.trade !== 'null') {
      if (filterStr) { filterStr += ' and '; }
      const _trade = +this.filter.trade === -10 ? 0 : this.filter.trade;
      filterStr += `employmentRecord.CompanyTrade.trade=="${_trade}"`;
    }
    return filterStr;
  }

  getTrade(id: number): string {
    if (id > 0) {
      return this.tradeSvc.getTradesById(id);
    }
  }

  getFullHours(item): number {
    let sum = 0;
    if (item.items && item.items.length > 0) {
      item.items.forEach(el => {
        sum += el.hours;
      });
    }
    return sum;
  }


}
