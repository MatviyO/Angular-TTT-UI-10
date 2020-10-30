import { Component, Input, Inject, OnInit, ViewChild } from '@angular/core';
import { DetailsWithTriggers, IEditorWithTriggersConfig, INavigationHelper, IResourceService, NavigationHelper, FileUploader, ConfirmComponent } from '@ttt/common';
import {
    HousingAllowance, HousingAllowanceItem, Trigger, MonthsService, Trade, Profile, TradesService,
    ProfileResourceService,
    EmploymentCompany,
    EmploymentCompanyResourceService,
} from '@ttt/core';
import { HousingAllowanceDetailsConfig } from './housing-allowance.details.config';


@Component({
    selector: 'app-housing-allowance-details',
    templateUrl: './housing-allowance.details.html',
    styleUrls: ['housing-allowance.details.component.scss'],
    providers: [HousingAllowanceDetailsConfig, MonthsService, TradesService, ProfileResourceService, EmploymentCompanyResourceService],
})

export class HousingAllowanceDetailsComponent extends DetailsWithTriggers<HousingAllowance> implements OnInit {
    @ViewChild(FileUploader) fileUploader: FileUploader;
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

    trades: Trade[] = this.tradeSvc.getTrades();
    _items: any[] = [];
    canNotHousing: boolean;
    addNewField: boolean = false;
    _startDate: Date;
    // triggers: Trigger[];
    _months = this.monthsSvc.getMonths();

    constructor(
        @Inject(HousingAllowanceDetailsConfig) config: IEditorWithTriggersConfig<HousingAllowance>,
        @Inject(NavigationHelper) protected navigation: INavigationHelper,
        @Inject(ProfileResourceService) private profileSvc: IResourceService<Profile>,
        @Inject(EmploymentCompanyResourceService) private employmentCompanySvc: IResourceService<EmploymentCompany>,
        private tradeSvc: TradesService,
        private monthsSvc: MonthsService,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
        // super.onTriggerLoaded((x) => this.hasTrigger(x));
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    dataLoaded(data) {
        if (!data) {
            this.entity = new HousingAllowance();
            this.entity.employmentCompanyId = +this.queryParams['id'];
            this._startDate = new Date();
            this.showLoadData = true;

            this.employmentCompanySvc.query(`id==${this.entity.employmentCompanyId}`)
                .then(result => {
                    if (result.length > 0) {
                        this.entity.employmentCompany = result[0];
                        this.navigation.addNavigation(`${this.queryParams['name']}`, `/profile/details/${result[0].employmentHistory.applicationId}`);

                        this.profileSvc.query(`id=${result[0].employmentHistory.applicationId}`, '', [{ key: 'apt', value: 'CanHillerHousingAllowance' }, { key: 'apt', value: 'HillerEmploymentId' }])
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

        } else {
            this._startDate = data.startDate;
            // if (data.items.length === 1 && !data.items[0].paperworkReceivedDate) {
            //     data.items[0].editing = true;
            // }
            if (data.employmentCompany && data.employmentCompany.employmentHistory.application) {
                this.navigation.addNavigation(`${data.employmentCompany.employmentHistory.application.firstName} ${data.employmentCompany.employmentHistory.application.lastName}`,
                    `/profile/details/${data.employmentCompany.employmentHistory.applicationId}`);
            }
        }
    }

    // hasTrigger(triggers: Trigger[]): void {
    //     if (triggers) {
    //         if (triggers.find(x => x.mainObjectId === this.entity.id && x.objectId === null)) {
    //             this.entity.hasTrigger = true;
    //         }
    //     }
    // }

    onSave(item, form): void {
        event.returnValue = false;
        if (form.valid) {
            this.entity.startDate = this.formatedDate(this._startDate) as Date;

            let p: number[] = [];
            this.entity.items.map(x => {
                if (p.indexOf(x.period) < 0) {
                    p.push(x.period);
                }
            });

            if (p.length != this.entity.items.length) {
                this.confirm.show('confirm', 'You are about to add duplicated record. Are you sure you would like to proceed?')
                    .then(res => {
                        if (res) {
                            this._save();
                        }
                    });
            } else {
                this._save();
            }
        } else {
            form._submitted = true;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    _save() {
        super.save()
            .then(res => {
                this.addNewField = false;
                if (this.entity.items.length === 1 && !this.entity.items[0].paperworkReceivedDate) {
                    this.entity.items[0].editing = true;
                }

            })
            .catch(err => this.onHttpError(err));
    }

    formatedDate = (inDate: Date = null): string | Date => {
        if (inDate) {
            inDate = new Date(inDate);
            return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
        } else {
            return new Date();
        }
    }

    addField() {
        let _date: any;
        this.addNewField = true;
        if (this.entity.items.length >= 6 && this.entity.employmentCompany.trade >= 3) {
            this.notificationSvc.warning('error', 'HVAC limit reached');
            return;
        }
        if (this.entity.items.length >= 12 && this.entity.employmentCompany.trade <= 2) {
            this.notificationSvc.warning('error', 'Plumbing/Electrical limit reached');
            return;
        }
        if (this.entity.items.length === 0) {
            _date = new Date(this.entity.startDate).getUTCMonth() + 1;
        } else {
            _date = this.entity.items[this.entity.items.length - 1].period + 1;
        }
        if (_date > 12) {
            _date = 1;
        }
        const item = new HousingAllowanceItem();
        item.period = _date;
        item.editing = true;
        this.edit(item);
        this.entity.items.push(item);
    }

    edit(item): void {
        this._items.push(Object.assign({}, item));
    }

    cancelEdit(item: HousingAllowanceItem, i: number): void {
        if (!item.id) {
            this.addNewField = false;
            this.entity.items.splice(this.entity.items.findIndex(x => x.period === item.period), 1);
            return;
        }
        const index = this._items.findIndex(x => x.id === item.id);
        if (index >= 0) {
            this.entity.items[i] = this._items[index];
            this._items[index].editing = false;
            this._items.splice(index, 1);

        }
    }

    getMonthById(id: number): string {
        if (id) {
            return this.monthsSvc.getMonthById(id);
        } else {
            return '';
        }
    }
}
