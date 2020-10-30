import { Component, Inject, ViewChild } from '@angular/core';
import { IDataService, IListWithTriggersConfig } from '@ttt/common/interfaces';
import { BaseSortableListWithTriggers, AddNewItemComponent } from '@ttt/common';
import { WorkforceTrainingPersonal, WorkforceTrainingPersonalItem } from '@ttt/core';
import { WorkforcePersonalListConfig } from './workforce-personal.list.config';

@Component({
    selector: 'app-workforce-personal-list',
    templateUrl: './workforce-personal.list.html',
    styleUrls: ['workforce-personal.list.component.scss'],
    providers: [WorkforcePersonalListConfig],
})

export class WorkforcePersonalListComponent extends BaseSortableListWithTriggers<WorkforceTrainingPersonal> {
    @ViewChild(AddNewItemComponent) addNewItem: AddNewItemComponent;
    totalItemHours: number;
    totalHours: any;
    phone: any;

    constructor(
        @Inject(WorkforcePersonalListConfig) config: IListWithTriggersConfig<WorkforceTrainingPersonal>,
    ) {
        super(config);
    }

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
      
        return filterStr;
    }

    showWindow = () => this.addNewItem.show();

    getMonthLength(items: WorkforceTrainingPersonalItem[]): number {
        let num = 0;
        const numArray = [];
        items.forEach(element => {
            const a = numArray.find(x => x === element.month);
            if (!a) {
                num++;
                numArray.push(element.month);
            }
        });
        return num;
    }

    getTotalHours(items: any[]): number {
        this.totalItemHours = 0;
        items.forEach(el => {
            if (el.totalHours) {
                this.totalItemHours += el.totalHours;
            }
        });
        return this.totalItemHours;
    }
}
