import { Component, Inject, OnInit } from '@angular/core';
import { IEditorConfig, IResourceService } from '@ttt/common/interfaces';
import { BaseEditableSortableList } from '@ttt/common';
import { WorkforceTrainingCompany, WorkforceTrainingPersonal, MonthsService, WorkforceTrainingPersonalItemResourceService } from '@ttt/core';
import { WorkforceCompanyListConfig } from './workforce-company.list.config';


@Component({
    selector: 'app-workforce-company-list',
    templateUrl: './workforce-company.list.html',
    styleUrls: ['workforce-company.list.component.scss'],
    providers: [WorkforceCompanyListConfig, WorkforceTrainingPersonalItemResourceService, MonthsService],
})

export class WorkforceCompanyListComponent extends BaseEditableSortableList<WorkforceTrainingCompany> implements OnInit {

    collapseAll: boolean;
    workForsePersonals: WorkforceTrainingPersonal[] = [];
    _workForsePersonals: any[] = [];
    _items: any[] = [];
    collapseData: any[] = [];

    constructor(
        @Inject(WorkforceCompanyListConfig) config: IEditorConfig<WorkforceTrainingCompany>,
        @Inject(WorkforceTrainingPersonalItemResourceService) private workForcePersonalItemSvc: IResourceService<WorkforceTrainingPersonal>,
        private monthsSvc: MonthsService,
    ) {
        super(config);

    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    getFilterFormatted(): string {
        let filterStr = '';
        filterStr = '';

        return filterStr;
    }
    
    getForCollapse(item) {
        this.collapseData = [];
        this.showLoadData = true;
        item.open = !item.open;
        if (!item.open) {
            this.showLoadData = false;
            return;
        }
        this.entities.forEach(el => {
            el.open = false;
        });
        item.open = true;
        this.workForcePersonalItemSvc.query(`month=${item.month}and year=${item.year}`)
        .then(res => {
            this.collapseData = res;
            this.showLoadData = false;
        })
        .catch(err => {
            this.onHttpError(err);
            this.showLoadData = false;
        });
    }

    clickCollapseAll() {
        this.collapseAll = !this.collapseAll;
        this.entities.forEach(el => {
            el.open = this.collapseAll;
        });
    }

    getName(id: number): string {
        const name = this.workForsePersonals.find(x => x.items[0].hillerWorkforceTrainingPersonalId === id).employmentRecord.application;
        if (name) {
            return `${name.firstName} ${name.lastName}`;
        }
    }

    getMonth(num: number): string {
        if (num > 0) {
            return this.monthsSvc.getMonthById(num);
        }
    }

    getSortFormatted = (): string => {
        return `year desc,month`;
    }

    edits(item) {
        event.preventDefault();
        this.edit(item);
    }

}
