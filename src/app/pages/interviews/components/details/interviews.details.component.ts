import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Params } from '@angular/router';
import { InterviewsDetailsConfig } from './interviews.details.config';
import {
  CompanyResourceService,
  InterviewOutcomeService,
  InterviewTypeService,
  JobTrackingService,
  TradesService
} from '../../../../core/data';
import {
  AlternativeLocation,
  ApplicationProgram,
  Company, CompanyContacts,
  CompanyTrade,
  InterviewOutcome,
  InterviewRecord, InterviewStageV2,
  InterviewType, JobStageNote, Trigger
} from '../../../../core/model';
import {GoogleMapComponent} from '../../../../core/components/googleMap';
import {IEditorStatefulWithTriggersConfig, IResourceService} from '../../../../common/interfaces';
import {ConfirmComponent} from '../../../../common/components/confirm';
import {ObservableService} from '../../../../common/services';
import {DetailsStatefulWithTriggersDirective} from '../../../../common/base-classes';


@Component({
    selector: 'app-interviews-details',
    templateUrl: './interviews.details.component.html',
    styleUrls: ['interviews.details.component.scss'],
    providers: [InterviewsDetailsConfig, InterviewOutcomeService, CompanyResourceService,
        InterviewTypeService, JobTrackingService, ObservableService],
})

export class InterviewsDetailsComponent extends DetailsStatefulWithTriggersDirective<InterviewRecord> implements OnInit {
    @ViewChild(GoogleMapComponent) googleMapComponent: GoogleMapComponent;
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

    interviewTypes: InterviewType[] = [];
    outcomes: InterviewOutcome[] = [];
    outComeId: number = null;
    triggers: Trigger[];
    applTrades: ApplicationProgram[];
    showMaps = false;
    editing = false;
    employmentCompany: CompanyTrade = new CompanyTrade(null);
    companyTrade: CompanyTrade = new CompanyTrade(null);
    selectCompanyTrades: CompanyTrade[] = [];
    selectCompanyOtherTrades: CompanyTrade[] = [];
    selectCompany: Company = null;
    stage: InterviewStageV2 = new InterviewStageV2();
    itemEdit: InterviewStageV2;

    constructor(
        private tradesSvc: TradesService,
        private observableSvc: ObservableService,
        private employmentSvc: JobTrackingService,
        @Inject(InterviewTypeService) protected interviewTypeSvc: IResourceService<InterviewType>,
        @Inject(InterviewOutcomeService) private interviewOutcomeSvc: IResourceService<InterviewOutcome>,
        @Inject(InterviewsDetailsConfig) private config: IEditorStatefulWithTriggersConfig<InterviewRecord>,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
        this.onTriggerLoaded((x) => this.hasTrigger(x));
    }

    ngOnInit(): void {
        this.entity = this.createInstance();
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.queryParams = params;
                    this._getData(+params['id'], +params['emplId']);
                },
            );

        this.interviewTypeSvc.query()
            .then(res => this.interviewTypes = res)
            .catch((e) => this.onHttpError(e));

        this.interviewOutcomeSvc.query()
            .then(res => this.outcomes = res)
            .catch((e) => this.onHttpError(e));
    }

    _getData(id: number, emplId: number): any {
        if (id) {
            if (emplId) {
                this.showLoadData = true;
                // tslint:disable-next-line:max-line-length
                this.dataSvc.query(`applicationId == ${id} and id = ${emplId}`, null, null, null, [], 'Application,Stages.Contact,Stages.Type,Stages.Status,Stages.Notes,Stages.Location,CompanyTrade.Company.Trades,CompanyTrade.Company.Contacts,CompanyTrade.Company.AlternateLocations')
                    .then(res => {
                        this.showLoadData = true;
                        if (res && res.length > 0) {
                            this.entity = res[0];
                            this.sortData();

                        }
                    });
            } else {
                this.navigation.addNavigation(`${this.queryParams['name']}`, `/profile/details/${this.queryParams['id']}`);
                this.editStage();
                this.showMap();
            }
        }
    }

    sortData(): void {
        this.entity.stages = this.entity.stages
          .sort((a, b) => a.index - b.index)
          .sort((a, b) => Date.parse((a.date as string)
            .split('/').reverse().join('-')) - Date.parse((b.date as string)
            .split('/').reverse().join('-')));
        this.entity.stages = this.entity.stages.filter(x => x.recordType === 'InterviewStage');
        this.dataLoaded(this.entity);
    }

    dataLoaded(data: InterviewRecord): void {
        this.getTriger(data, this.triggerCategory);
        this.cancelEditing();
        this.navigation.addNavigation(`${this.queryParams['name']}`, `/profile/details/${this.queryParams['id']}`);
        this.showLoadData = false;
        this.employmentCompany = this.entity.companyTrade;
        this.companyTrade = this.entity.companyTrade;
        this.selectCompany = this.companyTrade ? this.companyTrade.company : null;
        if (this.entity.stages && this.entity.stages.length > 0) {
            this.outComeId = this.entity.stages[this.entity.stages.length - 1].interviewOutcomeId;
        }
    }

    hasTrigger(triggers: Trigger[]): void {
        if (triggers) {
            if (triggers.find(x => x.mainObjectId === this.entity.id && x.applicationId === this.queryParams['id'])) {
                this.entity.hasTrigger = true;
            }
        }
    }

    onSave(stage: InterviewStageV2, form): void {
        event.returnValue = false;
        if (form.valid) {
            if (this.entity.id) {
                if (stage && stage.id) {
                    const _note = stage.notes.find(x => !x.id);
                    if (_note && stage.id) {
                        _note.stageId = stage.id;
                        this.employmentSvc.createStageNote(this.queryParams['id'], _note)
                            .then(res => {
                                this.showLoadData = false;
                                stage.notes[_note.index] = res;
                                this.updateStage(stage);
                            })
                            .catch(() => this.showLoadData = false);
                    } else {
                        this.updateStage(stage);
                    }

                } else {
                    if (stage) {
                        stage.jobRecordId = this.entity.id;
                        const _dates = this.entity.stages.filter(x => Date.parse((x.date as string)
                          .split('/').reverse().join('-')) === Date.parse((stage.date as string)
                          .split('/').reverse().join('-')));
                        if (_dates) {
                            stage.index = _dates.length;
                            this.showLoadData = true;
                            stage.notes = null;
                            this.createStage(stage);
                        }
                    } else {
                        stage = this.entity.stages && this.entity.stages[this.entity.stages.length - 1];
                        stage.interviewOutcomeId = this.outComeId;
                        if (stage) {
                            this.updateStage(stage, true);
                        }
                    }
                }
            } else {
                stage.companytradeid = this.selectCompany.companyTradeId;
                stage.notes = null;
                this.employmentSvc.createInterviewStage(this.queryParams['id'], stage)
                    .then((res) => this._getData(this.queryParams['id'], res.jobRecordId))
                    .catch((e) => this.onHttpError(e));
            }
        } else {
            form._submitted = true;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    saveNote(note: JobStageNote): void {
        this.showLoadData = true;
        note.stageId = this.itemEdit.id;
        if (note.id) {
            this.employmentSvc.updateStageNote(this.queryParams['id'], note)
                .then(res => {
                    this.showLoadData = false;
                    this.itemEdit.notes[note.index] = res;
                })
                .catch((e) => this.onHttpError(e));
        } else {
            this.employmentSvc.createStageNote(this.queryParams['id'], note)
                .then(res => {
                    this.showLoadData = false;
                    this.itemEdit.notes[note.index] = res;
                })
                .catch((e) => this.onHttpError(e));
        }
    }

    deleteNote(note: JobStageNote): void {
        this.confirm.show('confirm', 'Are you sure you would like to delete this note?')
            .then(answer => {
                if (answer) {
                    this.showLoadData = true;
                    note.stageId = this.itemEdit.id;
                    this.employmentSvc.deleteStageNote(this.queryParams['id'], note)
                        .then(() => {
                            this.showLoadData = false;
                            this.itemEdit.notes.splice(note.index, 1);
                        })
                        .catch((e) => this.onHttpError(e));
                }
            });
    }

    deleteStage(stage: InterviewStageV2): void {
        this.confirm.show('confirm', 'Are you sure you would like to delete this stage?')
            .then(answer => {
                if (answer) {
                    this.showLoadData = true;
                    this.employmentSvc.deleteInterviewStage(this.queryParams['id'], stage)
                        .then(() => {
                            const index = this.entity.stages.findIndex(x => x.id === stage.id);
                            if (index > -1) {
                                this.entity.stages.splice(index, 1);
                                if (this.entity.stages.length === 0) {
                                    this.redirect();
                                }
                            }
                            this.showLoadData = false;
                        })
                        .catch((e) => this.onHttpError(e));
                }
            });
    }

    updateStage(stage: InterviewStageV2, redirect: boolean = false): void {
        this.showLoadData = true;
        this.employmentSvc.updateInterviewStage(this.queryParams['id'], stage)
            .then((res) => {
                const index: number = this.entity.stages.findIndex(x => x.id === res.id);
                if (index > -1) {
                    this.entity.stages[index].rowVersion = res.rowVersion;
                    this.entity.stages[index].date = res.date;
                    this.entity.stages[index].typeId = res.typeId;
                    this.entity.stages[index].contactId = res.contactId;
                    redirect ? this.redirect() : this._getData(this.queryParams['id'], res.jobRecordId);
                }
            })
            .catch((e) => this.onHttpError(e));

    }

    createStage(stage: InterviewStageV2): void {
        this.employmentSvc.createInterviewStage(this.queryParams['id'], stage)
            .then((res) => {
                this.entity.stages.push(res);
                this.sortData();
            })
            .catch((e) => this.onHttpError(e));
    }

    onHired(): void {
        if (this.entity.stages && this.entity.stages.length > 0) {
            const stage = this.entity.stages[this.entity.stages.length - 1];
            stage.interviewOutcomeId = 1;
            this.updateStage(stage, true);
        }
    }

    editStage(item?: InterviewStageV2): void {
        this.editing = true;
        if (item) {
            this.itemEdit = Object.assign({}, item);
        } else {
            this.itemEdit = new InterviewStageV2();
        }
    }

    cancelEditing(): void {
        this.showMaps = false;
        this.editing = false;
        this.itemEdit = null;
        this.showLoadData = false;
    }

    companyChanged(sourceCompany: Company, alternativeLocId: number = null): void {
        this.selectCompany = sourceCompany;
        if (this.itemEdit) {
            this.itemEdit.locationId = null;
            this.itemEdit.contactId = null;
        }

        this.selectCompanyTrades = [];
        this.selectCompanyOtherTrades = [];

        if (sourceCompany && sourceCompany.id > 0 && this.selectCompany.trades) {
            this.selectCompany.trades.forEach((tr: CompanyTrade) => {
                if (tr.trade > 0) {
                    this.selectCompanyTrades.push(tr);
                } else {
                    if (tr.isActive) {
                        this.selectCompanyOtherTrades.push(tr);
                    }
                }
                const a = this.applTrades && this.applTrades.find(x => x.programType === tr.trade);
                tr.disable = !a;
            });
            return;
        }
    }

    observableSource(keyword: any): any {
        return this.observableSvc.observableSourceCompanies.bind(keyword);
    }

    getTradeById(trade: CompanyTrade): string {
        return trade.trade > 0 ? this.tradesSvc.getTradesById(trade.trade) : trade.name;
    }

    getOutcomeById(id: number): string {
        const _outcome = this.outcomes.find(x => x.id === id);
        return _outcome ? _outcome.description : '';
    }

    getInterviewType(id: number): string {
        const _type = this.interviewTypes.find(x => x.id === id);
        return _type ? _type.description : '';
    }

    getCompanyContact(contact: CompanyContacts, id: number): string {
        let contactName = '-';
        if (!id) {
            return contactName;
        }
        if (contact) {
            contactName = `${contact.firstName || ''} ${contact.lastName || ''} ${contact.phone || ''}`;
        } else {
            if (this.entity.companyTrade && this.entity.companyTrade.company && this.entity.companyTrade.company.contacts) {
                const _contact = this.entity.companyTrade.company.contacts.find(x => x.id === id);
                if (_contact) {
                    contactName = `${_contact.firstName || ''} ${_contact.lastName || ''} ${_contact.phone || ''}`;
                }
            }
        }
        return contactName;
    }

    getCompanyLocation(location: AlternativeLocation, id: number): string {
        let locationName = '-';
        if (id) {
            if (location) {
                locationName = `${location.name || ''} ${location.city || ''} ${location.state || ''}`;
            } else {
                if (this.entity.companyTrade && this.entity.companyTrade.company && this.entity.companyTrade.company.alternateLocations) {
                    const _location = this.entity.companyTrade.company.alternateLocations.find(x => x.id === id);
                    if (_location) {
                        locationName = `${_location.city || ''} ${_location.state || ''}`;
                    }
                }
            }
        } else {
            if (this.employmentCompany && this.employmentCompany.company) {
                locationName = `${this.employmentCompany.company.city || ''} ${this.employmentCompany.company.state || ''}`;
            }
        }
        return locationName;

    }

    selectComp(company: Company): void {
        this.companyChanged(company);
    }

    redirect(): void {
        this.router.navigateByUrl('/interviews/list');
        this.navigation.clear();
    }

    showMap(): void {
        this.showMaps = !this.showMaps;
        if (this.showMaps) {
            this.googleMapComponent.onShowMap(this.queryParams['id']);
        }
    }
}
