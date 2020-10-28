import { Component, ViewChild, OnInit, Inject } from '@angular/core';

import { ClassesDetailsConfig } from './classes.details.config';
import {AppUserService} from '../../../../core/data/appUser.service';
import {
  Graduation,
  GraduationLocation, Profile,
  ScheduledClass,
  SchedulingType,
  StudentGraduation,
  Trigger,
  WithdrawReason
} from '../../../../core/model';
import {AddNewSelectItemComponent} from '../../../../core/components/add-new-item-select';
import {ClassReservationsHelper, ToolsHelper} from '../../../../core/utils';
import {IDataService, IEditorStatefulWithTriggersConfig, IResourceService} from '../../../../common/interfaces';
import {
  ClassesService,
  ClassReservationsService, ClassWithdrawReasonService,
  GraduationDatesService, GraduationLocationsService,
  ProfileResourceService,
  TradesService
} from '../../../../core/data';
import {ConfirmComponent} from '../../../../common/components/confirm';
import {DetailsStatefulWithTriggersDirective} from '../../../../common/base-classes';



@Component({
    selector: 'app-classes-details',
    templateUrl: './classes.details.component.html',
    styleUrls: ['classes.details.component.scss'],
    providers: [ClassesDetailsConfig, ToolsHelper, AppUserService,
      ClassReservationsService, ClassReservationsHelper, ClassWithdrawReasonService],
})

export class ClassesDetailsComponent extends DetailsStatefulWithTriggersDirective<StudentGraduation> implements OnInit {
    @ViewChild(AddNewSelectItemComponent) addNewItem: AddNewSelectItemComponent;
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

    graduations: Graduation[];
    classes: ClassesDto[] = [];
    withdrawReasons: WithdrawReason[] = [];
    locations: GraduationLocation[];
    trades = this.tradesSvc.getTrades();
    triggers: Trigger[];
    profileRef: Profile;

    readonly studentStatus = { student: 'Student', withdraw: 'Withdrawn', reserved: 'Reserved' };

    constructor(
        @Inject(ClassesDetailsConfig) config: IEditorStatefulWithTriggersConfig<StudentGraduation>,
        @Inject(ProfileResourceService) private profileSvc: IResourceService<Profile>,
        @Inject(GraduationDatesService) private graduationDatesSvc: IResourceService<Graduation>,
        @Inject(GraduationLocationsService) private graduationLocationsSvc: IResourceService<GraduationLocation>,
        @Inject(ClassWithdrawReasonService) private withdrawSvc: IResourceService<WithdrawReason>,
        @Inject(ClassesService) private classesSvc: IDataService<ScheduledClass>,
        private reservationHelper: ClassReservationsHelper,
        private tradesSvc: TradesService,
        // private toolsHelper: ToolsHelper,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
        // super.onDataSaved((x) => this.saved(x));
        this.onTriggerLoaded((x) => this.hasTrigger(x));
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.graduationDatesSvc.query('', 'date desc', [], 'null', 'id;date')
            .then(res => this.graduations = res)
            .catch((e) => this.onHttpError(e));

        this.graduationLocationsSvc.query('', '', [], 'null', 'id;name;isActive')
            .then(res => this.locations = res)
            .catch((e) => this.onHttpError(e));
    }

    dataLoaded(data: StudentGraduation): any {
        this.showLoadData = true;
        if (!data) {
            this.entity = new StudentGraduation();
            this.entity.applicationId = +this.queryParams['id'];
        } else {
            if (data.application) {
                this.navigation.addNavigation(`${this.entity.application.firstName} ${this.entity.application.lastName}`, `/profile/details/${this.entity.applicationId}`);
            }
        }
        const p: Promise<any>[] = [];
        p.push(this.classesSvc.query(
            `reservations.any(appUserId = ${data ? data.applicationId : this.queryParams['id']}) or attendees.any(appUserId = ${data ? data.applicationId : this.queryParams['id']})`,
            'startDate desc',
            null,
            0,
            [],
            'Days;Program;Participants.AppUser;PriorClass;LaterClass;Days.Assignments.Assignment;Days.Assignments.Grades;Program.GraduationLevels',
        )
            .then(res => {
                this.withdrawSvc.query('', '', [], 'null', 'id;description;isActive;slsdCode')
                    .then(wr => {
                        this.withdrawReasons = wr;
                        this.classes = res.map(x => this.extendClass(x));
                    })
                    .catch(err => this.onHttpError(err));

                this.extraTriggers(data ? data.applicationId : this.queryParams['id']);
            })
            .catch(err => this.onHttpError(err)));
        p.push(this.profileSvc.query(`id=${data ? data.applicationId : this.queryParams['id']}`, '', [], 'null', 'id;firstName;lastName;isActive')
            .then(res => {
                if (res.length > 0) {
                    if (!this.entity.application) {
                        this.entity.application = res[0];
                        this.profileRef = res[0];
                        this.navigation.addNavigation(`${res[0].firstName} ${res[0].lastName}`, `/profile/details/${this.entity.applicationId}`);
                    } else {
                        this.profileRef = res[0];
                        this.entity.application = res[0];
                    }
                }
            })
            .catch(err => this.onHttpError(err)));

        Promise.all(p).then(() => this.showLoadData = false);
    }

    extraTriggers(applId: number): void {
        const flt = `applicationId=${applId}`;
        this.triggersSvc.queryByType('7', flt)
            .subscribe(
                (res: Trigger[]) => {
                    res.forEach(item => {
                        const types = `Trigger: ${this.componentTitle}`;

                        let trigStr = `${this.triggerHelper.getTriggerType(item.triggerType)} ${this.triggerHelper.getDays(item.value, item.isApproaching)}.`;

                        const cls = this.classes.find(x => x.id === item.objectId);
                        if (cls && cls.program && cls.program.name) {
                            trigStr += ` Class name: ${cls.program.name}`;
                        }

                        this.notificationSvc.notify(item.severity, types, trigStr);
                    });
                },
                err => {
                    this.onHttpError(err);
                });
    }

    extendClass(cls: ScheduledClass): ClassesDto {
        const item = Object.assign(new ClassesDto(), cls);

        const _attendee = cls.attendees.find(x => x.appUserId === this.entity.applicationId);

        if (_attendee) {
            if (_attendee.techLevel) {
                item.techLevel = _attendee.techLevel;
            }
            if (_attendee.withdrawnDate) {
                item.status = {
                    description: this.studentStatus.withdraw,
                    details: _attendee.withdrawnDate,
                    note: _attendee.classWithdrawnNote,
                    reason: this.withdrawReasons.find(x => x.id === _attendee.classWithdrawnReasonId).description,
                } as ClassStatus;
            } else {
                item.status = { description: this.studentStatus.student } as ClassStatus;
            }
        } else {
            item.status = { description: this.studentStatus.reserved } as ClassStatus;
        }

        return item;
    }

    deleteReservation(item: ScheduledClass): void {
        this.confirm.show(
            'confirm',
            `Are you sure you'd like to release a spot in ${item.program.name} class reserved for ${this.entity.application.firstName} ${this.entity.application.lastName}?`,
        )
            .then((conf: boolean) => {
                if (conf) {
                    this.showLoadData = true;
                    const index = item.reservations.findIndex(x => x.appUserId === this.entity.applicationId);
                    if (index >= 0) {
                        this.reservationHelper.releaseClassSpot(item.reservations[index])
                            .then(() => {
                                const cli = this.classes.findIndex(x => x.id === item.id);
                                if (cli >= 0) {
                                    this.classes.splice(cli, 1);
                                }
                                this.showLoadData = false;
                            })
                            .catch(err => this.onHttpError(err));
                    }
                }
            });
    }

    addingReservation = (): void => {
        this.showLoadData = true;
        this.addNewItem.show();
    }

    dataLoadedForNewItem = (): void => {
        this.showLoadData = false;
    }

    addNewReservation = (selClass: ScheduledClass): void => {
        if (selClass) {
            this.showLoadData = true;
            this.reservationHelper.reserveClassSpot(selClass, this.entity.application)
                .then(res => {
                    selClass.reservations.push(res);
                    this.classes.push(this.extendClass(selClass));
                    this.addNewItem.cancel();
                    this.showLoadData = false;
                })
                .catch(err => {
                    this.onHttpError(err);
                    this.addNewItem.cancel();
                });
        }
    }

    getTradesById = (id: number): string => this.tradesSvc.getTradesById(id);

    disableDate = (date: Date): boolean => new Date(date) < new Date();

    hasTrigger(triggers: Trigger[]): void {
        if (triggers) {
            if (triggers.find(x => x.mainObjectId === this.entity.id && x.objectId === null)) {
                this.entity.hasTrigger = true;
            }
            // if (this.entity.classes.length > 0) {
            //     this.entity.classes.forEach(item => {
            //         if (triggers.find(x => x.objectId === item.id)) {
            //             item.hasTrigger = true;
            //         }
            //     });
            // }
        }
    }

    onSave(form: { valid: boolean; _submitted: boolean; }): void {
        event.returnValue = false;
        if (form.valid) {
            if (!(this.entity.graduationExpectedDateId > 0)) {
                this.entity.graduationExpectedDateId = null;
            }
            super.save();

        } else {
            form._submitted = true;
            this.showLoadData = false;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    onHttpError(err: any): any {
        if (err.error && err.error.ErrorCode === 104) {
            this.showLoadData = false;
            this.notificationSvc.error('Classes details', `${this.entity.application.firstName} ${this.entity.application.lastName} already has reservation for selected class.`);
        } else {
            super.onHttpError(err);
        }
    }

    getSchedulingType(type: SchedulingType): string {
        return SchedulingType[type];
    }

    getClassIconSchedulingType(type: SchedulingType): string {
        if (type === SchedulingType.AM) {
            return 'fa fa-sun-o';
        }
        if (type === SchedulingType.PM1) {
            return 'fa fa-moon-o';
        }
        if (type === SchedulingType.PM2) {
            return 'fa fa-star-o';
        }
    }

}

class ClassesDto extends ScheduledClass {
    status: ClassStatus;
    techLevel: string;
    withdrewDate: Date;
}

class ClassStatus {
    description: string;
    details: any;
    reason: string;
    note: string;
}
