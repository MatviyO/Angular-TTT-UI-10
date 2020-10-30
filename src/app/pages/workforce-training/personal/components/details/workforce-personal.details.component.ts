import { Component, Input, Inject, DoCheck } from '@angular/core';
// import { DatePipe } from '@angular/common';

import { DetailsWithTriggers, IEditorWithTriggersConfig, IResourceService, INavigationHelper, NavigationHelper } from '@ttt/common';
import {
    WorkforceTrainingPersonal, WorkforceTrainingCompany, WorkforceTrainingPersonalItem, Trigger, Profile, MonthsService, ProfileResourceService,
    SettingService, WorkforceTrainingCompanyResourceService, EmploymentCompany, EmploymentCompanyResourceService, EmploymentRecord,
} from '@ttt/core';
import { WorkforcePersonalDetailsConfig } from './workforce-personal.details.config';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-workforce-personal-details',
    templateUrl: './workforce-personal.details.html',
    styleUrls: ['workforce-personal.details.component.scss'],
    providers: [WorkforcePersonalDetailsConfig, WorkforceTrainingCompanyResourceService, MonthsService, ProfileResourceService,
        EmploymentCompanyResourceService, SettingService],
})

export class WorkforcePersonalDetailsComponent extends DetailsWithTriggers<WorkforceTrainingPersonal> implements DoCheck {

    reseivedArray: WorkforceTrainingCompany[] = [];
    totalItemHours: number;
    _items: any[] = [];
    canNotHousing: boolean;
    addNewField: boolean = false;
    date: Date = new Date();
    _workforceTraining = new WorkforceTrainingPersonal();
    months = this.monthsSvc.getMonths();

    constructor(
        @Inject(WorkforcePersonalDetailsConfig) config: IEditorWithTriggersConfig<WorkforceTrainingPersonal>,
        @Inject(NavigationHelper) protected navigation: INavigationHelper,
        @Inject(ProfileResourceService) private profileSvc: IResourceService<Profile>,
        @Inject(EmploymentCompanyResourceService) private employmentCompanySvc: IResourceService<EmploymentRecord>,
        @Inject(WorkforceTrainingCompanyResourceService) private workForceCompanySvc: IResourceService<WorkforceTrainingCompany>,
        private monthsSvc: MonthsService,
        private settingSvc: SettingService,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
        // super.onTriggerLoaded((x) => this.hasTrigger(x));

    }
    ngDoCheck() {
        Observable.from(this.entity.items)
            .subscribe(x => (x.reimbursementAmount = x.totalHours * x.wage / 2).toFixed(2),
        );
    }

    dataLoaded(data: WorkforceTrainingPersonal) {
        if (!data) {
            this.entity = new WorkforceTrainingPersonal();
            this.entity.employmentRecordId = +this.queryParams['id'];
            this.showLoadData = true;

            this.settingSvc.query()
                .then(res => {
                    this.entity.maxHours = res.value.hillerWorkforceTrainingMaxHours;
                    this.getTotalHours();
                })
                .catch(err => this.onHttpError(err));

            this.employmentCompanySvc.query(`id==${this.entity.employmentRecordId}`)
                .then((result: EmploymentRecord[]) => {
                    if (result.length > 0) {
                        this.entity.employmentRecord = result[0];
                        this.navigation.addNavigation(`${this.queryParams['name']}`, `/profile/details/${result[0].applicationId}`);

                        this.profileSvc.query(`id=${result[0].applicationId}`, '', [{ key: 'apt', value: 'CanHillerHousingAllowance' }, { key: 'apt', value: 'HillerEmploymentId' }])
                            .then(res => {
                                if (res.length > 0) {
                                    if (!(res[0].properties && res[0].properties['CanHillerHousingAllowance'])) {
                                        this.notificationSvc.warning('info', 'Housing allowance is not available');
                                        this.canNotHousing = true;
                                        this.showLoadData = false;
                                        return;
                                    }
                                }
                            })
                            .catch(err => {
                                this.canNotHousing = true;
                                this.showLoadData = false;
                                this.onHttpError(err);
                            });
                        this.showLoadData = false;
                    }
                })
                .catch(err => {
                    this.onHttpError(err);
                    this.showLoadData = false;
                });
            this.addField();

        } else {
            this.workForceCompanySvc.query('received != null')
                .then(res => {
                    this.reseivedArray = res;
                    this.isReceived();

                })
                .catch(err => this.onHttpError(err));
            this.getTotalHours();
            if (data.employmentRecord && data.employmentRecord.application) {
                this.navigation.addNavigation(`${data.employmentRecord.application.firstName} ${data.employmentRecord.application.lastName}`,
                    `/profile/details/${data.employmentRecord.applicationId}`);
            }
        }


    }

    isReceived() {
        this.entity.items.forEach(el => {
            if (this.reseivedArray.length > 0) {
                this.reseivedArray.forEach(subEl => {
                    if (subEl.year === el.year && subEl.month === el.month) {
                        el.reseivedDate = subEl.received;
                    }
                });
            } else {
                return;
            }

        });
    }
    // hasTrigger(triggers: Trigger[]): void {
    //     if (triggers) {
    //         if (triggers.find(x => x.mainObjectId === this.entity.id && x.objectId === null)) {
    //             this.entity.hasTrigger = true;
    //         }
    //     }
    // }

    onSave(form): void {
        event.returnValue = false;
        if (form.valid) {

            this.getTotalHours();
            if (this.entity.maxHours < this.totalItemHours) {
                this.notificationSvc.warning('info', `Hours limit exceeded by ${(this.entity.maxHours - this.totalItemHours) * -1} hours`);
                const a = this.entity.items.find(x => x.editing === true);
                a.totalHours = 0;
                this.getTotalHours();
                return;
            }
            super.save()
                .then(res => {
                    this._workforceTraining = Object.assign({}, res);
                    this.addNewField = false;
                    this.getTotalHours();
                    this.isReceived();
                });
        } else {
            form._submitted = true;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    addField() {
        this.addNewField = true;
        const item = new WorkforceTrainingPersonalItem();
        item.year = this.date.getFullYear();
        item.month = this.date.getMonth() + 1;
        item.editing = true;
        this.edit(item);
        this.entity.items.push(item);
    }

    edit(item): void {
        this._items.push(Object.assign({}, item));
    }

    cancelEdit(item: WorkforceTrainingPersonalItem, i: number): void {
        if (!item.id) {
            if (this.entity.items.length > 1) {
                this.addNewField = false;
                this.entity.items.splice(this.entity.items.length - 1, 1);
            }
            return;
        }
        const index = this._items.findIndex(x => x.id === item.id);
        if (index >= 0) {
            this.entity.items[i] = this._items[index];
            this._items[index].editing = false;
            this._items.splice(index, 1);
        }
    }

    getTotalHours(): void {
        this.totalItemHours = 0;
        this.entity.items.forEach(el => {
            if (el.totalHours) {
                this.totalItemHours += el.totalHours;
            }
        });
    }


}
