import { Component, OnInit, Inject } from '@angular/core';


import { MentorshipDetailsConfig } from './mentorship.details.config';
import {DetailsStatefulDirective} from '../../../../common/base-classes';
import {CompanyResourceService, FeedbacksService} from '../../../../core/data';
import {Company, Feedback, MentorFeedback, Mentorship} from '../../../../core/model';
import {IEditorStatefulConfig, IResourceService} from '../../../../common/interfaces';

@Component({
    selector: 'app-mentorship-details',
    templateUrl: './mentorship.details.component.html',
    styleUrls: ['mentorship.details.component.scss'],
    providers: [MentorshipDetailsConfig],
})

export class MentorshipDetailsComponent extends DetailsStatefulDirective<Mentorship> implements OnInit {
    _feedbacks: Feedback[];
    _companies: Company[] = [];

    constructor(
        @Inject(MentorshipDetailsConfig) config: IEditorStatefulConfig<Mentorship>,
        @Inject(FeedbacksService) private feedbackSvc: IResourceService<Feedback>,
        @Inject(CompanyResourceService) private companySvc: IResourceService<Company>,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.feedbackSvc.query('', '', null, 'null', 'id;description;isActive')
            .then(res => {
                this._feedbacks = res;
            })
            .catch(this.onHttpError);

        // this.companySvc.query()
        this.companySvc.query('', '', null, 'AlternateLocations;', 'isActive;name;id;alternateLocations[*].name;alternateLocations[*].id;alternateLocations[*].isActive')
            .then(res => this._companies = res)
            .catch(this.onHttpError);
    }

    dataLoaded(data: Mentorship): void {
        if (!data) {
            this.entity = new Mentorship();
            this.addMeeting();
            this.entity.applicationId = +this.queryParams['id'];
            this.navigation.addNavigation(`${this.queryParams['name']}`, `/profile/details/${this.entity.applicationId}`);

        } else {
            if (data.application) {
                this.navigation.addNavigation(`${data.application.firstName} ${data.application.lastName}`, `/profile/details/${this.entity.applicationId}`);
            }
        }
    }

    onSave(form): void {
        event.returnValue = false;
        if (form.valid) {
            this.entity.feedbacks.forEach(item => {
                if (!(item.feedbackId > 0)) {
                    item.feedbackId = null;
                }
                if (!(item.companyAlternateLocationId > 0)) {
                    item.companyAlternateLocationId = null;
                }
           });
            super.save();
        } else {
            form._submitted = true;
            this.showLoadData = false;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    getAltLocation(companyid: number): any {
        const company = this._companies.find(x => x.id === +companyid);
        if (company) {
            return company.alternateLocations;
        } else {
            return;
        }
    }

    addMeeting(): void {
        const cls = new MentorFeedback();
        this.entity.feedbacks.push(cls);
    }

}

