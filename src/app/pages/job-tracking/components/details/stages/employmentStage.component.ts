import { Component, Output, Input, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { BaseState } from './baseStage.component';
import {ConfirmComponent} from '../../../../../common/components/confirm';
import {
  ApplicationProgram,
  Company,
  CompanyTrade,
  EmploymentCompany,
  EmploymentRecord,
  EmploymentStageV2,
  EmploymentStatus, JobStageNote
} from '../../../../../core/model';


@Component({
    selector: 'app-employment-stage',
    templateUrl: 'employmentStage.component.html',
    styleUrls: ['../job-tracking.details.component.scss'],
})

export class EmploymentStageComponent extends BaseState implements OnInit {

    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
    @Output() onSaved = new EventEmitter();
    @Output() onSaveNote = new EventEmitter();
    @Output() onDeleteNote = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    @Output() onNavigate = new EventEmitter();
    @Input() employmentCompany: EmploymentCompany;
    @Input() statuses: EmploymentStatus[] = [];
    @Input() stage: EmploymentStageV2;
    @Input() applTrades: ApplicationProgram[];
    @Input() mode: string;
    @Input() _employment: EmploymentRecord;
    @Input() selectCompany: Company;
    showLoadData = false;


    selectComp(company: Company): void {
        this.companyChanged(company);
    }

    companyChanged(sourceCompany: Company): void {
        this.selectCompany = sourceCompany;
        if (this.stage) {
            this.stage.locationId = null;
            this.selectCompany.companyTradeId = null;
        }
        this.selectCompanyTrades = [];
        this.selectCompanyOtherTrades = [];

        if (sourceCompany && sourceCompany.id > 0) {
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

    save = (form: { valid: boolean; _submitted: boolean; }) => {
        if (form.valid) {
            if (!(this.stage.locationId >= 0)) {
                this.stage.locationId = null;
            }
            const _note = this.stage.notes && this.stage.notes.find(x => !x.id);
            if (_note && this.stage.id) {
                _note.stageId = this.stage.id;
                this.employmentSvc.createStageNote(this.applId, _note)
                    .then(res => {
                        this.showLoadData = false;
                        this.stage.notes[_note.index] = res;
                        this.onSaved.emit({ stage: this.stage, employmentCompany: this.selectCompany });
                    })
                    .catch(() => this.showLoadData = false);
            } else {
                this.onSaved.emit({ stage: this.stage, employmentCompany: this.selectCompany });

            }
            this.showMaps = false;
        } else {
            form._submitted = true;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    cancel = (): void => {
        this.showMaps = false;
        this.onCancel.emit(true);
    }

    saveNote(note: JobStageNote): void {
        if (this.stage && this.stage.id) {
            this.showLoadData = true;
            note.stageId = this.stage.id;
            if (note.id) {
                this.employmentSvc.updateStageNote(this.applId, note)
                    .then(res => {
                        this.showLoadData = false;
                        this.stage.notes[note.index] = res;
                    })
                    .catch(() => this.showLoadData = false);
            } else {
                this.employmentSvc.createStageNote(this.applId, note)
                    .then(res => {
                        this.showLoadData = false;
                        this.stage.notes[note.index] = res;
                    })
                    .catch(() => this.showLoadData = false);
            }
        }
    }

    deleteNote(note: JobStageNote): void {
        this.confirm.show('confirm', 'Are you sure you would like to delete this note?')
            .then(answer => {
                if (answer) {
                    this.showLoadData = true;
                    note.stageId = this.stage.id;
                    this.employmentSvc.deleteStageNote(this.applId, note)
                        .then(() => {
                            this.showLoadData = false;
                            this.stage.notes.splice(note.index, 1);
                        })
                        .catch(() => this.showLoadData = false);
                }
            });
    }

    navigate = () => this.onNavigate.emit();

}
