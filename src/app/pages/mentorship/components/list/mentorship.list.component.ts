import { Component, ViewChild, Inject, OnInit } from '@angular/core';

import { MentorshipListConfig } from './mentorship.list.config';
import {CompanyResourceService, FeedbacksService} from '../../../../core/data';
import {Company, Feedback, Mentorship} from '../../../../core/model';
import {IComponentConfig, IResourceService} from '../../../../common/interfaces';
import {AddNewItemComponent} from '../../../../common/components/add-new-item/add-new-item.component';
import {BaseSortableListDirective} from '../../../../common/base-classes';

@Component({
    selector: 'app-mentorship-list',
    templateUrl: './mentorship.list.component.html',
    styleUrls: ['mentorship.list.component.scss'],
    providers: [MentorshipListConfig],
})

export class MentorshipListComponent extends BaseSortableListDirective<Mentorship> implements OnInit {
    @ViewChild(AddNewItemComponent) addNewItem: AddNewItemComponent;
    feedbacks: Feedback[];
    _companies: Company[] = [];

    constructor(
        @Inject(MentorshipListConfig) config: IComponentConfig<Mentorship>,
        @Inject(FeedbacksService) protected feedbackSvc: IResourceService<Feedback>,
        @Inject(CompanyResourceService) private companySvc: IResourceService<Company>,
    ) {
        super(config);
    }
    ngOnInit(): void {
        super.ngOnInit();
        this.feedbackSvc.query('', '', null, 'null', 'id;description;isActive')
            .then(res => this.feedbacks = res)
            .catch((e) => this.onHttpError(e));

        this.companySvc.query('', '', null, 'null', 'id;name;isActive')
            .then(res => this._companies = res)
            .catch(this.onHttpError);
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
        if (this.filter.mentorName) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `feedbacks.Any(mentorName=="${this.filter.mentorName}")`;
        }
        // if (this.filter.company && this.filter.company !== 'undefined') {
        if (this.filter.company >= 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `feedbacks.Any(companyId=="${this.filter.company}")`;
        }

        // if (this.filter.feedbackId && this.filter.feedbackId !== 'undefined') {
        if (this.filter.feedbackId >= 0) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `feedbacks.Any(feedbackId=="${this.filter.feedbackId}")`;
        }

        return filterStr;
    }
}

