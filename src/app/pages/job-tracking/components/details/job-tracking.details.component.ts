import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { JobTrackingDetailsConfig } from './job-tracking.details.config';
import { EmploymentStageComponent } from './stages';
import * as moment from 'moment';
import {DetailsStatefulWithTriggersDirective} from '../../../../common/base-classes';
import {
  ApplicationProgram, CompanyTrade, EmploymentCompany,
  EmploymentRecord,
  EmploymentStage,
  EmploymentStageV2, EmploymentStatus, InterviewStageV2,
  NonEmploymentStage,
  NonPlacementReason, Profile
} from '../../../../core/model';
import {
  CompanyContactsService, EmploymentStatusService, InterviewOutcomeService,
  InterviewStatusHelper,
  InterviewTypeService,
  JobTrackingService, NonPlacementReasonService,
  ProfileVeteranResourceService,
  TradesService
} from '../../../../core/data';
import {CountryStatesService, State} from '../../../../core/data/country-state.service';
import {IDataService, IEditorStatefulWithTriggersConfig, IResourceService} from '../../../../common/interfaces';
import {ConfirmComponent} from '../../../../common/components/confirm';


@Component({
    selector: 'app-job-tracking-details',
    templateUrl: './job-tracking.details.component.html',
    styleUrls: ['job-tracking.details.component.scss'],
    providers: [JobTrackingDetailsConfig, ProfileVeteranResourceService, JobTrackingService,
      CountryStatesService, InterviewTypeService, CompanyContactsService, InterviewOutcomeService, NonPlacementReasonService],
})

export class JobTrackingDetailsComponent extends DetailsStatefulWithTriggersDirective<EmploymentRecord> implements OnInit {
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
    @ViewChild(EmploymentStageComponent) employmentStageComponent: EmploymentStageComponent;
    private countryStateSvc: CountryStatesService = new CountryStatesService();

    employments: EmploymentRecord[] = [];
    userName: string;
    countries = this.countryStateSvc.getCounries();
    states: State[] = [];
    nonPlacementReasons: NonPlacementReason[] = [];
    employmentStatuses: EmploymentStatus[] = [];
    _emplStatuses: EmploymentStatus[] = [];
    applTrades: ApplicationProgram[];
    collapseAll = false;
    _mode = 'new';
    applId: number;
    nonEmploymentStage: NonEmploymentStage;
    _employment: EmploymentRecord;
    _stage: EmploymentStageV2 = null;

    constructor(
        @Inject(ProfileVeteranResourceService) public profileSvc: IDataService<Profile>,
        @Inject(JobTrackingDetailsConfig) config: IEditorStatefulWithTriggersConfig<EmploymentRecord>,
        @Inject(EmploymentStatusService) private emplStatusSvc: IResourceService<EmploymentStatus>,
        @Inject(NonPlacementReasonService) private nonPlacementReasonSvc: IResourceService<NonPlacementReason>,
        private tradesSvc: TradesService,
        private employmentSvc: JobTrackingService,
        private statusHelper: InterviewStatusHelper,
    ) {
        super(config);
    }

    ngOnInit(): void {
        this.route.params
            .subscribe(
                (params: any) => {
                    this.queryParams = params;
                    if (params['id']) {
                        this.applId = params['id'];
                        this.showLoadData = true;
                        this.loadData(params['id']);
                    }
                    if (params['name']) {
                        this.userName = params['name'];
                        this.navigation.addNavigation(`${this.userName}`, `/profile/details/${this.applId}`);
                    }
                },
            );
    }

    loadData(userId: number): void {
        this.getEmployments(userId);
        this.getTriger();

        this.emplStatusSvc.query()
            .then(res => this._emplStatuses = res)
            .catch((e) => this.onHttpError(e));

        this.nonPlacementReasonSvc.query()
            .then(res => this.nonPlacementReasons = res)
            .catch((e) => this.onHttpError(e));
    }

    getTriger = (): void => {
        if (this.applId) {
            this.triggersSvc.queryByCategory('7', `objectId==${this.applId}`)
                .subscribe(
                    data => {
                        data.forEach(item => {
                            const trigStr = `${this.triggerHelper.getTriggerType(item.triggerType)} ${this.triggerHelper.getDays(item.value, item.isApproaching)}`;
                            const types = `Trigger: Employment`;
                            this.notificationSvc.error(types, `${trigStr}`);
                        });
                    },
                    err => this.onHttpError(err),
                );
        }
    }

    getEmployments(id: number, canceling: boolean = true): any {
        this.dataSvc.query(`applicationId == ${id}`, null, null, null, [], 'Application,Stages.InterviewOutcome,Stages.Status,Stages.Notes,Stages.Location,CompanyTrade.Company.Trades,CompanyTrade.Company.AlternateLocations')
            .then((res: EmploymentRecord[]) => {
                this.employments = [];
                res.map((employment: EmploymentRecord) => {
                    const intStages = employment.stages.filter(x => x.recordType === 'InterviewStage');
                    const emplSages = employment.stages.filter(x => x.recordType !== 'InterviewStage');
                    employment.stages = emplSages.length > 0 ? emplSages : [];
                    if (intStages && intStages.length > 0) {
                        intStages.sort((a, b) => a.index - b.index).sort((a, b) => Date.parse((a.date as string).split('/').reverse().join('-')) - Date.parse((b.date as string).split('/').reverse().join('-')));
                        const intStage = intStages.find(x => x.interviewOutcomeId > 0);
                        if (intStage) {
                            employment.stages.push(intStage);
                        } else {
                            intStages[0].lastStageDate = intStages[intStages.length - 1].date;
                            employment.stages.push(intStages[0]);
                        }
                    }
                    this.employments.push(employment);
                });
                if (!this.userName && this.employments && this.employments.length > 0) {
                    this.userName = `${this.employments[0].application.firstName} ${this.employments[0].application.lastName}`;
                    this.navigation.addNavigation(`${this.userName}`, `/profile/details/${this.applId}`);
                }
                this.sortEmployments(canceling);
                this.showLoadData = false;
            }).catch((e) => this.onHttpError(e));
    }

    sortEmployments = (canceling: boolean = true) => {
        this.employments.map((employment: EmploymentRecord) => {
            employment.stages.sort((b, a) => a.index - b.index)
              .sort((b, a) => Date.parse((a.date as string)
                .split('/').reverse().join('-')) - Date.parse((b.date as string)
                .split('/').reverse().join('-')));
        });
        this.employments.sort((b, a) => a.id - b.id)
          .sort((b, a) => Date.parse((a.startDate || '' as string)
            .split('/').reverse().join('-')) - Date.parse((b.startDate || '' as string)
            .split('/').reverse().join('-')));
        this.autoExpandItems();
        if (canceling) {
            this.cancelEditStage();
        }
    }

    autoExpandItems = (): void => {
        if (this.employments) {
            if (this.employments.length === 1) {
                this.employments[0].open = true;
            } else {
                this.employments.map((employment: EmploymentRecord) => {
                    employment.open = !!(employment.stages[0].status && employment.stages[0].status.type);
                });
            }
        }
    }

    deleteStage(stage: EmploymentStageV2): void {
        this.confirm.show('confirm', 'Are you sure you would like to delete this stage?')
            .then(answer => {
                if (answer) {
                    this.showLoadData = true;
                    this.employmentSvc.deleteEmploymentStage(this.applId, stage)
                        .then(() => this.getEmployments(this.applId))
                        .catch((e) => this.onHttpError(e));
                }
            });
    }

    redirect(): void {
        this.router.navigateByUrl('/job-tracking/list');
        this.navigation.clear();
    }

    editEmploymentStage(mode: string, employment: EmploymentRecord, stage: EmploymentStageV2 = null): void {
        let cloneStage = JSON.parse(JSON.stringify(stage));
        this._mode = mode;
        if (employment && employment.recordType === 'NonEmploymentRecord') {
            this.editNonEmployment(mode, employment, cloneStage);
            return;
        }
        if (mode === 'edit') {
            this.employmentStatuses = this.getEmplStatuses(stage.status && stage.status.type ? '' : 'leave');
        } else {
            this.employmentStatuses = this.getEmplStatuses(this._mode);
        }
        this._employment = employment ? employment : new EmploymentRecord();
        if (cloneStage) {
            this._stage = cloneStage;
            if (mode !== 'edit') {
                this._stage.id = 0;
                this._stage.notes = [];
                this._stage.rowVersion = null;
            }
        } else {
            cloneStage = this._employment.stages && this._employment.stages.length > 0 ? JSON.parse(JSON.stringify(employment.stages[0]))
              : new EmploymentStageV2();
            cloneStage.id = 0;
            cloneStage.notes = [];
            cloneStage.rowVersion = null;
            this._stage = cloneStage;
        }
    }

    saveEmploymnetStage(newStage: { stage: EmploymentStageV2; employmentCompany: any }): void {
        this.showLoadData = true;
        const _stage = newStage.stage;
        if (this._employment.id) {
            _stage.jobRecordId = this._employment.id;

            if (_stage.id) {
                this.employmentSvc.updateEmploymentStage(this.applId, _stage)
                    .then(() => this.getEmployments(this.applId))
                    .catch((e) => this.onHttpError(e));
            } else {
                if (this._mode === 'promote') {
                    _stage.statusId = 1;
                }
                _stage.notes = null;
                const _dates = this._employment.stages.filter(x => Date.parse((x.date as string)
                  .split('/').reverse().join('-')) === Date.parse((_stage.date as string)
                  .split('/').reverse().join('-')));
                if (_dates) {
                    _stage.index = _dates.length;
                }
                this.employmentSvc.createEmploymentStage(this.applId, _stage)
                    .then(() => this.getEmployments(this.applId))
                    .catch((e) => this.onHttpError(e));
            }
        } else {
            const _newStage = new EmploymentStageV2();
            _newStage.date = _stage.date;
            _newStage.locationId = _stage.locationId;
            _newStage.title = _stage.title;
            _newStage.statusId = _stage.statusId;
            _newStage.wage = _stage.wage;
            _newStage.note = _stage.note;
            _newStage.notes = null;
            _newStage.companytradeid = newStage.employmentCompany.companyTradeId;
            this.employmentSvc.createEmploymentStage(this.applId, _newStage)
                .then(() => this.getEmployments(this.applId))
                .catch((e) => this.onHttpError(e));
        }
    }

    editNonEmployment(roleEdit: string, employment: EmploymentRecord, _stage: NonEmploymentStage | EmploymentStageV2 = null): void {
        let stage = new NonEmploymentStage();
        stage.nonPlacementReason = null;
        if (roleEdit !== 'new') {
            if (_stage) {
                stage = _stage as NonEmploymentStage;
            } else {
                stage = employment.stages.length > 0 ? JSON.parse(JSON.stringify(employment.stages[0])) : new NonEmploymentStage();
                if (roleEdit === 'add') {
                    stage.id = 0;
                    stage.rowVersion = null;
                }
            }
        }
        this.nonEmploymentStage = stage;
        this.onChangeNonPlasementReason();
    }

    saveNonEmployment(form: any): void {
        if (form.valid) {
            this.showLoadData = true;
            this.nonEmploymentStage.nonPlacementReason = null;
            this.nonEmploymentStage.nonPlacementReasonId = +this.nonEmploymentStage.nonPlacementReasonId;
            if (this.nonEmploymentStage.id) {
                this.employmentSvc.updateNonEmploymentStage(this.applId, this.nonEmploymentStage)
                    .then(() => this.getEmployments(this.applId))
                    .catch((e) => this.onHttpError(e));
            } else {
                this.employmentSvc.createNonEmploymentStage(this.applId, this.nonEmploymentStage)
                    .then(() => this.getEmployments(this.applId))
                    .catch((e) => this.onHttpError(e));
            }
        } else {
            form._submitted = true;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    onChangeNonPlasementReason = (): void => {
        const _nonPlacementReason = this.nonPlacementReasons.find(x => x.id === +this.nonEmploymentStage.nonPlacementReasonId);
        if (_nonPlacementReason) {
            this.nonEmploymentStage.nonPlacementReason = _nonPlacementReason;
        }
    }

    changeCompany(firstLoad: boolean = false): void {
        if (this.nonEmploymentStage.schoolingCountry) {
            const _country = this.countries.find(x => x.countryShortCode === this.nonEmploymentStage.schoolingCountry);
            if (_country) { this.states = _country.regions; }
            if (!firstLoad) { this.nonEmploymentStage.schoolingState = null; }
        } else {
            this.nonEmploymentStage.schoolingState = null;
            this.states = [];
        }
    }

    getTradeOfCompany = (company: CompanyTrade): string => company ? company.trade > 0 ? this.tradesSvc.getTradesById(company.trade)
      : company.name : ''


    getFullAddress(option): string {
        let _address = ``;
        if (option) {
            if (option.country) {
                const _country = this.countryStateSvc.getFullCountryName(option.country);
                if (_country) {
                    _address += ` ${_country}`;
                    if (option.state) {
                        const _state = this.countryStateSvc.getFullStateName(option.country, option.state);
                        if (_state) {
                            _address += ` | ${_state}`;
                        }
                    }
                }
            }
            if (option.city) { _address += ` | ${option.city}`; }
            if (option.address) { _address += ` | ${option.address}`; }
            if (option.zip) { _address += ` | ${option.zip}`; }
        }
        return _address;
    }

    getNonEmploymentReasonName = (id: number): string => {
        const _reason = this.nonPlacementReasons.find(x => x.id === id);
        return _reason ? _reason.description : '';
    }

    isEmptyObject = (obj: object): boolean => {
        let isEmpty = true;
        for (const key in obj) {
            if (key) {
                if (obj[key] !== null) {
                    return isEmpty = false;
                }
            }
        }
        return isEmpty;
    }

    formatedDate = (inDate: Date = null): string | Date => {
        if (inDate) {
            inDate = new Date(inDate);
            return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
        } else {
            return new Date();
        }
    }

    cancelEditStage(isLoadData: boolean = false): void {
        this._stage = null;
        this._employment = null;
        this.nonEmploymentStage = null;
        if (isLoadData) {
            this.getEmployments(this.applId, false);
        }
    }

    getCompanyDuration(companyId: number): number {
        let sum = 0;
        this.employments.forEach((empl: EmploymentRecord) => {
            if (empl.companyTrade && empl.companyTrade.companyId === companyId) {
                const _value = this.getEmploymentDuration(empl, true);
                sum += +_value ? +_value : 0;
            }
        });
        return sum;
    }

    getTradeDuration(companyTrade: CompanyTrade, otherTrade: boolean): number {
        let sum = 0;
        this.employments.forEach((empl: EmploymentRecord) => {
            if (otherTrade) {
                if (empl.companyTrade && empl.companyTrade.name === companyTrade.name) {
                    const _value = this.getEmploymentDuration(empl, true);
                    sum += +_value ? +_value : 0;
                }
            } else {
                if (empl.companyTrade && empl.companyTrade.trade === companyTrade.trade) {
                    const _value = this.getEmploymentDuration(empl, true);
                    sum += +_value ? +_value : 0;
                }
            }
        });
        return sum;
    }

    getUniqueArrayOfCompanies(): EmploymentRecord[] {
        const array = this.employments.filter(x => x.recordType === 'EmploymentRecord');
        return array.filter((obj, pos, arr) => arr.map(mapObj => mapObj.companyTrade.companyId).indexOf(obj.companyTrade.companyId) === pos);
    }

    getUniqueArrayOfTrades(): EmploymentRecord[] {
        const array = this.employments.filter(x => x.recordType === 'EmploymentRecord');
        let a = array.filter((obj, pos, arr) => arr.map(mapObj => mapObj.companyTrade.trade).indexOf(obj.companyTrade.trade) === pos);
        let b = array.filter((obj, pos, arr) => arr.map(mapObj => mapObj.companyTrade.name).indexOf(obj.companyTrade.name) === pos);
        a = a.filter(x => x.companyTrade.trade > 0);
        b = b.filter(x => x.companyTrade.trade < 1);
        return [...a, ...b];
    }

    getTradeById = (trade: CompanyTrade) => trade.trade > 0 ? this.tradesSvc.getTradesById(trade.trade) : trade.name;

    getEmploymentDuration(employment: EmploymentRecord, onlyNumber: boolean = false): string {
        let _duration = (0).toFixed(2);
        if (employment) {
            if (employment.endDate) {
                _duration = moment.duration(moment(employment.endDate).diff(moment(employment.startDate))).asMonths().toFixed(2);
            } else {
                if (employment.startDate) {
                    _duration = moment.duration(moment().diff(moment(employment.startDate))).asMonths().toFixed(2);
                }
            }
        }
        return onlyNumber ? _duration : `${_duration} month(s)`;
    }

    getStageDuration(employment: EmploymentRecord, index: number): string {
        let _duration = (0).toFixed(2);
        if (employment.stages[index].recordType === 'InterviewStage' && employment.startDate) {
            _duration = moment.duration(moment(employment.startDate).diff(moment(employment.stages[index].date))).asMonths().toFixed(2);
        } else {
            if (index > 0) {
                _duration = moment.duration(moment(employment.stages[index - 1].date)
                  .diff(moment(employment.stages[index].date))).asMonths().toFixed(2);
            } else {
                if (!employment.endDate) {
                    _duration = moment.duration(moment().diff(moment(employment.stages[index].date))).asMonths().toFixed(2);
                } else {
                    if (employment.stages[index].recordType === 'NonEmploymentStage') {
                        _duration = moment.duration(moment(employment.endDate)
                          .diff(moment(employment.stages[index].date))).asMonths().toFixed(2);
                    }
                }
            }
        }
        return `${_duration} month(s)`;
    }

    isEmployed = (empl: EmploymentCompany): boolean => empl.employmentStages.length > 0 && empl.employmentStages
      .filter((x: EmploymentStage) => !x.status.type).length === 0;

    isEmployedHired = (emp: EmploymentCompany): boolean => (emp.lastEmploymentStage) && ((emp.lastEmploymentStage.status.type === 1));

    clickCollapseAll(): void {
        this.collapseAll = !this.collapseAll;
        this.employments.forEach((el: EmploymentRecord) => {
            el.open = this.collapseAll;
        });
    }

    getEmplStatuses(mode: string): EmploymentStatus[] {
        switch (mode) {
            case 'leave': {
                return this._emplStatuses.filter(x => !x.type);
            }
            case 'add':
            case 'new':
            case 'promote':
            default:
                return this._emplStatuses.filter(x => x.type);
        }
    }

    getStatusProcess(stages: InterviewStageV2[]): string {
        const _outccome = stages.find(x => !!x.interviewOutcome);
        if (_outccome) {
            return `${_outccome.interviewOutcome.description} on ${moment(_outccome.date).format('L')} `;
        } else {
            return this.statusHelper.get(stages).statusFormatted;
        }
    }

}

