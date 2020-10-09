import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { ClassesScheduleDetailsConfig } from './classes-schedule.details.config';

import { AppUserService } from '../../../../../core/data/appUser.service';
import {IEditorStatefulConfig, IResourceService, ITriggerHelper, ITriggerService} from '../../../../../common/interfaces';
import {ClassReservationsHelper} from '../../../../../core/utils';
import {Campus, Trade} from '../../../../../core/model/properties';
import {ApplicationType, Attendee, Profile, Reservation, ScheduledClass, Trigger, WithdrawReason} from '../../../../../core/model';
import {
  CampusesService,
  ClassAttendeesService,
  ClassesService, ClassReservationsService,
  ClassWithdrawReasonService,
  TradesService,
  TriggerHelper, TriggerService
} from '../../../../../core/data';
import {ObservableService} from '../../../../../common/services';
import {DetailsStatefulDirective} from '../../../../../common/base-classes';
import {ConfirmComponent} from '../../../../../common/components/confirm';

@Component({
    selector: 'app-classes-schedule-details',
    templateUrl: './classes-schedule.details.component.html',
  // tslint:disable-next-line:max-line-length
    providers: [ClassesScheduleDetailsConfig, ClassAttendeesService, ClassesService, ObservableService, AppUserService, ClassReservationsService, ClassReservationsHelper, ClassWithdrawReasonService],
    styleUrls: ['classes-schedule.details.component.scss'],
})

export class ClassesScheduleDetailsComponent extends DetailsStatefulDirective<ScheduledClass> implements OnInit {

    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
    private application: Profile;
    trades: Trade[] = this.tradesSvc.getTrades();
    campuses: Campus[] = [];
    withdrawReasons: WithdrawReason[] = [];
    editAttendeeNote: Attendee;
    editReservationNote: Reservation;
    addParticipants: boolean;

    constructor(
        @Inject(ClassesScheduleDetailsConfig) config: IEditorStatefulConfig<ScheduledClass>,
        @Inject(CampusesService) private campusSvc: IResourceService<Campus>,
        @Inject(ClassWithdrawReasonService) private withdrawSvc: IResourceService<WithdrawReason>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        private tradesSvc: TradesService,
        private observableSvc: ObservableService,
        private reservationHelper: ClassReservationsHelper,
        private attendeeService: ClassAttendeesService,
        private reservationService: ClassReservationsService,
    ) {
        super(config);
    }

    ngOnInit(): void {
        super.ngOnInit();
        super.onDataLoaded((x) => this.dataLoaded(x));
        this.campusSvc.query()
            .then((res: Campus[]) => {
                this.campuses = res;
            })
            .catch((e) => this.onHttpError(e));
        this.withdrawSvc.query()
            .then((res: WithdrawReason[]) => {
                this.withdrawReasons = res;
                this.populateReasons();
            })
            .catch((e) => this.onHttpError(e));
    }

    dataLoaded(data: ScheduledClass): any {
        if (this.entity.id) {
            this.extraTriggers();
            this.populateReasons();
        }
    }

    populateReasons(): any  {
        if (this.withdrawReasons.length > 0 && this.entity && this.entity.attendees && this.entity.attendees.length > 0) {
            this.entity.attendees.map(x => {
                if (x.classWithdrawnReasonId && x.classWithdrawnReasonId > 0) {
                    x.classWithdrawnReason = this.withdrawReasons.find(w => w.id === x.classWithdrawnReasonId);
                }
            });
        }
    }

    editNote(i: number, isStudent: boolean): any {
        if (isStudent) {
            this.editAttendeeNote = Object.assign({}, this.entity.attendees.filter(x => this.filterMilitary(x))[i]);
        } else {
            this.editReservationNote = Object.assign({}, this.entity.reservations.filter(x => this.filterMilitary(x))[i]);
        }
    }

    updateNotes(): any {
        if (this.editAttendeeNote) {
            this.attendeeService.update(this.editAttendeeNote)
                .then((res) => {
                    const index = this.entity.attendees.findIndex(x => x.id === res.id);
                    if (index >= 0) {
                        this.entity.attendees[index].rowVersion = res.rowVersion;
                        this.entity.attendees[index].notes = res.notes;
                    }
                    this.editAttendeeNote = null;
                })
                .catch(err => this.onHttpError(err));
        } else {
            this.reservationService.update(this.editReservationNote)
                .then((res) => {
                    const index = this.entity.reservations.findIndex(x => x.id === res.id);
                    if (index >= 0) {
                        this.entity.reservations[index].rowVersion = res.rowVersion;
                        this.entity.reservations[index].notes = res.notes;
                    }
                    this.editReservationNote = null;
                })
                .catch(err => this.onHttpError(err));

        }
    }

    cancelEdit(isStudent: boolean): any {
        if (isStudent) {
            this.editAttendeeNote = null;
        } else {
            this.editReservationNote = null;
        }
    }

    onSave(form): void {
        event.returnValue = false;
        if (form.valid) {
            super.save();
        } else {
            form._submitted = true;
            this.showLoadData = false;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    filterStudents(student: Attendee): boolean {
        return student.appUser.type === ApplicationType.Military;
    }

    filterMilitary(item: Reservation | Attendee): boolean {
        return item.appUser.type === ApplicationType.Military;
    }

    observableSource(keyword: any): Profile {
        return this.observableSvc.observableSourceProfile.bind(keyword);
    }

    reserveClassSpot(): void {
        if (this.application && this.application.id) {
            this.showLoadData = true;
            this.reservationHelper.reserveClassSpot(this.entity, this.application)
                .then(res => {
                    this.application = null;
                    this.showLoadData = false;
                    this.addParticipants = false;
                    super.ngOnInit();
                })
                .catch(err => this.onHttpError(err));

        }
    }

    ploatPercent(value: number): any {
        value = value ? value : 0;
        return value.toFixed(2);
    }

    extraTriggers(): void {
        const flt = `objectId=${this.entity.id}`;
        this.triggersSvc.queryByType('7', flt)
            .subscribe(
                (res: Trigger[]) => {
                    res.forEach(item => {
                        const types = `Trigger: ${this.componentTitle}`;

                        let trigStr = `${this.triggerHelper.getTriggerType(item.triggerType)} ${this.triggerHelper.getDays(item.value, item.isApproaching)}.`;

                        let appl = this.entity.attendees.map(x => (x.appUser)).find(x => x.id === item.applicationId);
                        if (appl) {
                            trigStr += ` Student: ${appl.firstName} ${appl.lastName}.`;
                        } else {
                            appl = this.entity.reservations.map(x => x.appUser).find(x => x.id === item.applicationId);
                            if (appl) {
                                trigStr += ` Reservation for ${appl.firstName} ${appl.lastName}.`;
                            }
                        }

                        this.notificationSvc.notify(item.severity, types, trigStr);
                    });
                },
                err => {
                    this.onHttpError(err);
                });
    }

    deleteReservation(item: Reservation): void {
        this.confirm.show(
            'confirm',
            `Are you sure you'd like to release a class spot reserved for ${item.appUser.firstName} ${item.appUser.lastName}?`,
        )
            .then((conf: boolean) => {
                if (conf) {
                    this.showLoadData = true;
                    this.reservationHelper.releaseClassSpot(item)
                        .then(() => {
                            super.ngOnInit();
                            this.showLoadData = false;
                        })
                        .catch(err => this.onHttpError(err));
                }
            });
    }

    deleteAttendee(obj: Attendee): void {
        if (new Date(this.entity.startDate) > new Date()) {
            this.confirm.show(
                'confirm',
                `Are you sure you'd like to remove a class attendee ${obj.appUser.firstName} ${obj.appUser.lastName}?`,
            )
                .then((res: boolean) => {
                    if (res) {
                        this.attendeeService.delete(obj)
                            .then(() => super.ngOnInit())
                            .catch(err => this.onHttpError(err));
                    }
                });
        } else {
            this.notificationSvc.warning('info', 'Class has been started already');
        }
    }

    onHttpError(err: any): any {
        this.showLoadData = false;
        if (err.error && err.error.ErrorCode === 104) {
            this.notificationSvc.error('Classes details', `${this.application.firstName} ${this.application.lastName} already has reservation for selected class.`);
        } else {
            super.onHttpError(err);
        }
    }
}
