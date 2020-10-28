import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { RideAlongDetailsConfig } from './ride-along.details.config';
import {Feedback, OfficeLocation, Profile, RAStatus, RideAlong, RideAlongDate, Trigger} from '../../../../core/model';
import {IEditorStatefulWithTriggersConfig, IResourceService, Severity} from '../../../../common/interfaces';
import {
  FeedbacksService,
  OfficeLocationService,
  ProfileResourceService,
  RideAlongStatusService,
  TradesService
} from '../../../../core/data';
import {ConfirmComponent} from '../../../../common/components/confirm';
import {DetailsStatefulWithTriggersDirective} from '../../../../common/base-classes';

class ApprovedDate extends RideAlongDate {
    approved: boolean;
}

@Component({
    selector: 'app-ride-along.details',
    templateUrl: './ride-along.details.component.html',
    styleUrls: ['ride-along.details.component.scss'],
    providers: [RideAlongDetailsConfig, ProfileResourceService],
})

export class RideAlongDetailsComponent extends DetailsStatefulWithTriggersDirective<RideAlong> implements OnInit {
    trades = this.tradesSvc.getTrades();
    offices: OfficeLocation[];
    feedbacks: Feedback[];
    triggers: Trigger[];
    allDates: ApprovedDate[] = [];
    newApprovedDate: Date;
    showCalendar = false;

    constructor(
        @Inject(RideAlongDetailsConfig) config: IEditorStatefulWithTriggersConfig<RideAlong>,
        @Inject(ProfileResourceService) private profileSvc: IResourceService<Profile>,
        @Inject(OfficeLocationService) protected officeLocSvc: IResourceService<OfficeLocation>,
        @Inject(FeedbacksService) protected feedbackSvc: IResourceService<Feedback>,
        protected statusSvc: RideAlongStatusService,
        private tradesSvc: TradesService,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
        this.onTriggerLoaded((x) => this.hasTrigger(x));
    }
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

    ngOnInit(): void {
        this.route.params
            .subscribe(param => {
                if (param.selector === 'appl') {
                    this.entity = new RideAlong();
                    this.entity.status = null;
                    this.entity.applicationId = param.id;
                    this.navigation.addNavigation(`${param.name}`, `/profile/details/${param.id}`);
                    this.assimilationTrade(param.id);
                } else {
                    super.ngOnInit();
                }
            });

        this.officeLocSvc.query('', '', null, 'null', 'id;name;isActive')
            .then(res => this.offices = res)
            .catch(this.onHttpError);

        this.feedbackSvc.query('', '', null, 'null', 'id;description;isActive')
            .then(res => this.feedbacks = res)
            .catch(this.onHttpError);
    }

    getTradesById = (id: number): string => this.tradesSvc.getTradesById(id);

    getStatusById = (id: number): string => this.statusSvc.getStatusById(id);

    hasTrigger(triggers: Trigger[]): void {
        if (triggers) {
            if (triggers.find(x => x.mainObjectId === this.entity.id && x.objectId === null)) {
                this.entity.hasTrigger = true;
            }
        }
    }

    assimilationTrade = (userID: number) => {
        this.profileSvc.query(`id=${userID}`)
            .then(res => {
                if (res && res.length > 0) {
                    this.trades.forEach(tr => {
                        const el = res[0].programsAdmittedTo.filter(x => x.programType === tr.id);
                        if (!el || el.length <= 0) {
                            tr.disable = true;
                        }
                    });
                }
            }).catch(err => this.onHttpError(err));
    }

    dataLoaded(data: RideAlong): void {
        this.assimilationTrade(this.queryParams['id']);

        if (data.application) {
            this.navigation.addNavigation(`${data.application.firstName} ${data.application.lastName}`, `/profile/details/${this.entity.applicationId}`);
        }
        this.generateDates();
    }

    generateDates = (): void => {
        this.allDates = [];
        this.entity.approvedDates.forEach((dateItem: ApprovedDate) => {
            const _dateItem = dateItem;
            _dateItem.approved = true;
            this.allDates.push(_dateItem);
        });
        this.entity.requestedDates.forEach((dateItem: ApprovedDate) => {
            const isApproved = this.allDates.find(x => x.date === dateItem.date);
            if (!isApproved) {
                const _dateItem = dateItem as ApprovedDate;
                _dateItem.approved = false;
                this.allDates.push(_dateItem);
            }
        });
    }

    approvedDate(date: Date = null): void {
        if (date) {
            this.allDates.forEach((item: ApprovedDate) => {
                if (item.date === date) {
                    item.approved = !item.approved;
                }
            });
        } else {
            if (this.newApprovedDate) {
                const isApproved = this.allDates.find(x => this.formatedDate(x.date) === this.formatedDate(this.newApprovedDate));
                if (isApproved) {
                    if (isApproved.approved) {
                        this.notificationSvc.notify(Severity.info, 'Approved dates', 'This date is already approved');
                    } else {
                        isApproved.approved = true;
                    }
                } else {
                    const newApprovedDate = new ApprovedDate();
                    newApprovedDate.date = this.newApprovedDate;
                    newApprovedDate.approved = true;

                    this.allDates.push(newApprovedDate);
                    this.newApprovedDate = null;
                }
            }
        }
    }

    setAllDatesToData = (): Promise<boolean> => {
        this.entity.approvedDates = [];
        return new Promise(resolve => {
            this.allDates.forEach((item: ApprovedDate) => {
                const _date = this.formatedDate(item.date);
                item.date = _date as Date;
                if (item.approved) {
                    const _a = {
                        date: item.date,
                    };
                    this.entity.approvedDates.push(_a as RideAlongDate);
                    if (this.entity.requestedDates.length === 0) {
                        this.entity.requestedDates.push(this.entity.approvedDates[0]);
                    }
                }
            });
            resolve(true);
        });
    }

    onSave(form: { valid: boolean; _submitted: boolean; }): void {
        if (form.valid) {
            if (!this.hasApprovedDates()) {
                this.notificationSvc.notify(Severity.info, 'Approved dates', 'No added approved date');
                return;
            }
            if (this.entity.status === null) {
                this.entity.status = RAStatus.Approved;
                this.setAllDatesToData()
                    .then(() => super.save());
                return;
            }

            if (this.entity.status === RAStatus.Confirmed) {
                this.entity.status = RAStatus.Completed;
                super.save();
            } else {
                if (this.entity.status === RAStatus.Approved || this.entity.status === RAStatus.Requested) {

                    this.entity.status = RAStatus.Approved;
                    this.setAllDatesToData()
                        .then(() => super.save());
                }
            }
        } else {
            form._submitted = true;
            this.showLoadData = false;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    confirmRA = (form: { valid: boolean; _submitted: boolean; }): void => {
        if (form.valid) {
            if (!this.hasApprovedDates()) {
                this.notificationSvc.notify(Severity.info, 'Approved dates', 'No added approved date');
                return;
            } else {
                this.entity.status = RAStatus.Confirmed;
                this.setAllDatesToData()
                    .then(() => super.save());
            }
        } else {
            form._submitted = true;
            this.showLoadData = false;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    cancelRA = (): void => {
        this.confirm.show(
            'confirm',
            `Are you sure you would like to cancel this ride-along?`, { ok: 'YES', cancel: 'NO' },
        )
            .then((answer: boolean) => {
                if (answer) {
                    this.entity.status = RAStatus.AdminCanceled;
                    super.save();
                }
            });
    }

    saveNotes = (): void => {
        super.save();
    }

    hasApprovedDates = (): boolean => {
        return !!(this.allDates.find(x => x.approved === true));
    }

    addMessage = (message: string) => {
        if (this.entity.userNotes) {
            this.entity.userNotes += message;
        } else {
            this.entity.userNotes = message;
        }
        super.save();
    }

    setColorStatus = (status: number): string => {
        switch (status) {
            case RAStatus.Approved: return `status-${status}`;
            case RAStatus.Confirmed: return `status-${status}`;
            case RAStatus.Completed: return `status-${status}`;
            case RAStatus.UserCanceled: return `status-${status}`;
            case RAStatus.AdminCanceled: return `status-${status}`;
            default: return '';
        }
    }

    formatedDate = (inDate: Date): string | Date => {
        if (inDate) {
            inDate = new Date(inDate);
            return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
        } else {
            return new Date();
        }
    }

    addDateToApprove = (date: Date) => {
        const isApproved = this.allDates.findIndex(a => this.formatedDate(a.date) == this.formatedDate(date));
        if (isApproved > -1) {
            this.allDates[isApproved].approved = !this.allDates[isApproved].approved;
        } else {
            this.newApprovedDate = date;
            this.approvedDate();
        }
    }
}
