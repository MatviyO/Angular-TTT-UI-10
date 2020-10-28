import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { ClassesListConfig } from './classes.list.config';
import {ClassesScheduleService, GraduationDatesService, GraduationLocationsService, TradesService} from '../../../../core/data';
import {IListWithTriggersConfig, IResourceService} from '../../../../common/interfaces';
import {Graduation, GraduationLocation, ScheduledClass, StudentGraduation} from '../../../../core/model';
import {AddNewItemComponent} from '../../../../common/components/add-new-item/add-new-item.component';
import {BaseSortableListWithTriggersDirective} from '../../../../common/base-classes';

@Component({
    selector: 'app-classes-list',
    templateUrl: './classes.list.component.html',
    styleUrls: ['classes.list.component.scss'],
    providers: [ClassesListConfig],
})

export class ClassesListComponent extends BaseSortableListWithTriggersDirective<StudentGraduation> implements OnInit {
    @ViewChild(AddNewItemComponent) addNewItem: AddNewItemComponent;
    locations: GraduationLocation[];
    graduations: Graduation[];
    currentDate = new Date();
    query: any = false;
    schedules: any[];

    constructor(
        @Inject(ClassesListConfig) private config: IListWithTriggersConfig<StudentGraduation>,
        @Inject(GraduationDatesService) private graduationDatesSvc: IResourceService<Graduation>,
        @Inject(GraduationLocationsService) private graduationLocationsSvc: IResourceService<GraduationLocation>,
        @Inject(ClassesScheduleService) private scheduleSvc: IResourceService<ScheduledClass>,
        private tradesSvc: TradesService,
        private route: ActivatedRoute,
    ) {
        super(config);
    }

    ngOnInit(): void {
        this.graduationLocationsSvc.query('', '', null, 'null', 'id;name;isActive')
            .then(res => this.locations = res)
            .catch((e) => this.onHttpError(e));

        this.graduationDatesSvc.query('', '', null, 'null', 'id;date;isActive')
            .then(res => this.graduations = res)
            .catch((e) => this.onHttpError(e));

        this.triggerSvc.queryByCategory('Classes', ' ')
            .subscribe(
                res => this.triggers = res,
                err => this.onHttpError(err),
            );
        this.route.params
            .subscribe(
                (params: any) => this.query = params,
            );
        if (this.query.filter === 'wrn') {
            this.showfilter = true;
            this.filter.invitations = 1;
        }
        if (this.query.filter === 'alert') {
            this.showfilter = true;
            this.filter.invitations = 2;
        }
        if (this.query.filter) {
            if (!isNaN(this.query.filter)) {
                this.showfilter = true;
                this.filter.graduationDate = this.query.filter;
            }
        }
        super.ngOnInit();
    }


    showWindow = () => this.addNewItem.show();

    disableDate(date: Date): boolean {
        return +new Date(date) < +this.currentDate;
    }

    getTradesById(id: number): any {
        return this.tradesSvc.getTradesById(id);
    }

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

        if (this.filter.locationId && this.filter.locationId > 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `graduationLocationId=("${this.filter.locationId}")`;
        }

        if (this.filter.graduationDate === 'none' || this.filter.graduationDate && this.filter.graduationDate > 0) {
            if (filterStr) { filterStr += ' and '; }
            if (this.filter.graduationDate === 'none') {
                filterStr += `graduationExpectedDateId=null`;
            } else {
                filterStr += `graduationExpectedDateId=("${this.filter.graduationDate}")`;
            }
        }

        if (this.filter.attending || this.filter.attending === false) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `isAttendingGraduation eq ${this.filter.attending}`;
        }

        if (this.filter.graduated || this.filter.graduated === false) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `graduationExpectedDate.date${this.filter.graduated ? '<' : '>'}"${this.formatDate(this.currentDate)}"`;
        }

        if (this.filter.invitations > 0) {

            const yellowDate = new Date();
            yellowDate.setDate(yellowDate.getDate() + 20);
            const redDate = new Date();
            redDate.setDate(redDate.getDate() + 10);
            if (this.filter.invitations === 1) {
                if (filterStr) { filterStr += ' and '; }
                filterStr += `graduationInvitationSentDate=null and graduationExpectedDate.date<"${this.formatDate(redDate)}"`;
            }
            if (this.filter.invitations === 2) {
                if (filterStr) { filterStr += ' and '; }
                // tslint:disable-next-line:max-line-length
                filterStr += `graduationInvitationSentDate=null and graduationExpectedDate.date<"${this.formatDate(yellowDate)}"and graduationExpectedDate.date>"${this.formatDate(redDate)}" `;
            }
        }
        return filterStr;
    }

    formatDate(d: Date): string {
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }
}

