import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import {  ActivatedRoute  } from '@angular/router';
import { RideAlongListConfig } from './ride-along.list.config';
import {IListWithTriggersConfig, IResourceService} from '../../../../common/interfaces';
import {Feedback, OfficeLocation, RAStatus, RideAlong} from '../../../../core/model';
import {FeedbacksService, OfficeLocationService, RideAlongStatusService, TradesService} from '../../../../core/data';
import {AddNewItemComponent} from '../../../../common/components/add-new-item/add-new-item.component';
import {BaseSortableListWithTriggersDirective} from '../../../../common/base-classes';

@Component({
    selector: 'app-ride-along.list',
    templateUrl: './ride-along.list.component.html',
    styleUrls: ['ride-along.list.component.scss'],
    providers: [RideAlongListConfig],
})

export class RideAlongListComponent extends BaseSortableListWithTriggersDirective<RideAlong> implements OnInit {
    @ViewChild(AddNewItemComponent) addNewItem: AddNewItemComponent;
    rideAlongs: any;
    query: any = null;
    trades = this.tradesSvc.getTrades();
    statuses = this.statusSvc.getStatuses();
    offices: OfficeLocation[] = [];
    feedbacks: Feedback[] = [];

    constructor(
        @Inject(RideAlongListConfig) config: IListWithTriggersConfig<RideAlong>,
        @Inject(OfficeLocationService) protected officeLoc: IResourceService<OfficeLocation>,
        @Inject(FeedbacksService) protected feedbackSvc: IResourceService<Feedback>,
        private tradesSvc: TradesService,
        private statusSvc: RideAlongStatusService,
        private route: ActivatedRoute,
    ) {
        super(config);
    }

    ngOnInit(): void {


        this.officeLoc.query('', '', null, 'null', 'id;name;isActive')
            .then(res => this.offices = res)
            .catch((e) => this.onHttpError(e));

        this.feedbackSvc.query('', '', null, 'null', 'id;description;isActive')
            .then(res => this.feedbacks = res)
            .catch((e) => this.onHttpError(e));

        this.route.params
            .subscribe(
                (params: any) => {
                    this.query = params;
                },
            );
        if (this.query.name) {
            this.filter.name = this.query.name;
            this.showfilter = true;
        }
        super.ngOnInit();
    }

    showWindow = () => this.addNewItem.show();

    getTradesById = (id: number): string => this.tradesSvc.getTradesById(id);

    getStatusById = (id: number): string => this.statusSvc.getStatusById(id);

    getLocationById = (id: number): string => {
        const location = this.offices.find(x => x.id === id);
        if (location) {
            return location.name;
        } else {
            return '';
        }
    }

    getFeedbackById = (id: number): string => {
        const feedback = this.feedbacks.find(x => x.id === id);
        if (feedback) {
            return feedback.description;
        } else {
            return ' - ';
        }
    }

    addStatusColor = (status: number): string => {
        switch (status) {
            case RAStatus.Approved: return `status-${status}`;
            case RAStatus.Confirmed: return `status-${status}`;
            case RAStatus.Completed: return `status-${status}`;
            case RAStatus.UserCanceled: return `status-${status}`;
            case RAStatus.AdminCanceled: return `status-${status}`;
            default: return '';
        }
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

        if ( this.filter.status >= 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `status=="${this.filter.status}"`;
        }
        // if (this.filter.officeLocationId && this.filter.officeLocationId !== 'undefined') {
        if (this.filter.officeLocationId >= 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `officeLocationId=="${this.filter.officeLocationId}"`;
        }

        // if (this.filter.feedbackId && this.filter.feedbackId !== 'undefined') {
        if (this.filter.feedbackId >= 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `feedbackId=="${this.filter.feedbackId}"`;
        }
        return filterStr;
    }
}

