import { Component, Inject, ViewChild } from '@angular/core';
import { IListWithTriggersConfig } from '@ttt/common/interfaces';
import { BaseSortableListWithTriggers, AddNewItemComponent } from '@ttt/common';
import { HousingAllowance, TradesService } from '@ttt/core';
import { HousingAllowanceListConfig } from './housing-allowance.list.config';

@Component({
    selector: 'app-housing-allowance-list',
    templateUrl: './housing-allowance.list.html',
    styleUrls: ['housing-allowance.list.component.scss'],
    providers: [HousingAllowanceListConfig, TradesService],
})

export class HousingAllowanceListComponent extends BaseSortableListWithTriggers<HousingAllowance> {
    @ViewChild(AddNewItemComponent) addNewItem: AddNewItemComponent;
    trades: any[] = this.tradeSvc.getTrades();
    filterNewItem: string = `type="3" or type="2"`;

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
                    fName += `(employmentCompany.employmentHistory.application.firstName.contains("${w}") or employmentCompany.employmentHistory.application.lastName.contains("${w}"))`;
                }
            });
            filterStr += `(${fName})`;
        }
        if (this.filter.trade) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `employmentCompany.trade=="${this.filter.trade}"`;
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
