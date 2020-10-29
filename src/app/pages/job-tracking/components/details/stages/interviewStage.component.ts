// import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
// import { EmploymentCompany, ApplicationProgram, InterviewType, InterviewOutcomeService, InterviewOutcome, InterviewStage, EmploymentStage, CompanyContactsService } from 'app/core';
// import { BaseState } from './baseStage.component';


// @Component({
//     selector: 'interview-stage',
//     templateUrl: 'interviewStage.component.html',
//     styleUrls: ['../job-tracking.details.component.scss'],
//     providers: [InterviewOutcomeService, CompanyContactsService],
// })

// export class InterviewStageComponent extends BaseState implements OnInit {
//     @Output() onSaved = new EventEmitter();
//     @Output() onCancel = new EventEmitter();
//     @Output() onError = new EventEmitter();
//     @Output() onNavigate = new EventEmitter();

//     @Input() employmentCompany: EmploymentCompany;
//     @Input() applTrades: ApplicationProgram[];

//     interviewTypes: InterviewType[];
//     outcomes: InterviewOutcome[];

//     editing: boolean = false;
//     showOutcome: boolean = false;
//     num: number;


//     ngOnInit(): void {
//         super.ngOnInit();

//         if (this.employmentCompany.companyId) {
//             this.contactSvc.query(`companyId = ${this.employmentCompany.companyId}`)
//                 .then(res => this.employmentCompany.company.contacts = res);
//         }

//         this.interviewTypeSvc.query()
//             .then(res => this.interviewTypes = res)
//             .catch(e => this.onError.emit(e));

//         this.interviewOutcomeSvc.query()
//             .then(res => this.outcomes = res)
//             .catch(e => this.onError.emit(e));

//         if (!this.employmentCompany.id) {
//             this.editStage();
//         }
//     }

//     navigate = () => this.onNavigate.emit();


//     cancel = (): void => {
//         this.showMaps = false;
//         this.onCancel.emit();
//     }

//     formatedDate = (inDate: Date = null): string | Date => {
//         if (inDate) {
//             inDate = new Date(inDate);
//             return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
//         } else {
//             return new Date();
//         }
//     }

//     setEmploymentStagesIndex = (stage: InterviewStage) => {
//         const equalDates = [];
//         if (this.employmentCompany) {
//             this.employmentCompany.interviewStages.forEach((stg: InterviewStage, i: number) => {
//                 if ((this.formatedDate(stage.date) === this.formatedDate(stg.date)) && stage.id !== stg.id) {
//                     equalDates.push(stg);
//                     stg.index = equalDates.length - 1;
//                 }
//             });
//             stage.index = equalDates.length;
//         }
//     }

//     onSave = (editStage: any, form: { valid: boolean; _submitted: boolean; }): void => {
//         if (form.valid) {
//             this.showMaps = false;
//             if (editStage) {
//                 if (editStage.id && this.num >= 0) {
//                     if (this.employmentCompany.interviewOutcomeId > 1 && this.employmentCompany.employmentStages.length > 0) {
//                         this.notHired();
//                         return;
//                     } else {
//                         const stIndex = this.employmentCompany.interviewStages.findIndex((x: InterviewStage) => x.id === editStage.id); 
//                         this.employmentCompany.interviewStages[stIndex] = editStage;
//                     }
//                 } else {
//                     editStage.employmentCompanyId = this.employmentCompany.id;
//                     editStage.date = this.formatedDate(editStage.date);
//                     this.employmentCompany.interviewStages.push(editStage);
//                 }
//                 this.setEmploymentStagesIndex(editStage);
//             }
//             if (this.employmentCompany.interviewOutcomeId > 1 && this.employmentCompany.employmentStages.length > 0) {
//                 this.notHired();
//                 return;
//             }
//             this.onSaved.emit(this.employmentCompany);
//             this.num = null;
//         } else {
//             form._submitted = true;
//             this.notificationSvc.warning('Interview stage', 'Please fill in required fields');
//         }
//     }

//     editStage(item: InterviewStage = null): void {
//         this.editing = true;
//         if (item) {
//             this.itemEdit = Object.assign({}, item);
//         } else {
//             this.itemEdit = new InterviewStage();
//         }
//     }

//     hired = (): void => {
//         if (!this.employmentCompany.interviewOutcome || !this.employmentCompany.interviewOutcome.isHired) {
//             this.employmentCompany.interviewOutcomeId = this.outcomes.find(x => x.isHired).id;
//             const newStage = new EmploymentStage();
//             newStage.employmentCompanyId = this.employmentCompany.id;
//             newStage.date = new Date().toJSON().split('T')[0];
//             newStage.statusId = 1;
//             this.employmentCompany.employmentStages.push(newStage);
//             this.onSaved.emit(this.employmentCompany);
//         }
//     }

//     notHired = (): void => {
//         this.confirm.show('confirm',
//             'After changing the outcome, all stages after the interview will be deleted, are you sure you\'d like to do it?')
//             .then(result => {
//                 if (result) {
//                     this.employmentCompany.interviewOutcomeId = this.outcomes.find(x => !x.isHired).id;
//                     this.employmentCompany.employmentStages = [];
//                     this.onSaved.emit(this.employmentCompany);
//                 }
//             });
//     }

// }
