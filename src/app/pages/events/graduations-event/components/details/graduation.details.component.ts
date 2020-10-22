import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { GraduationDetailsConfig } from './graduation.details.config';
import {ConfirmComponent} from '../../../../../common/components/confirm';
import {Graduation} from '../../../../../core/model/properties';
import {Profile, StudentGraduation} from '../../../../../core/model';
import {IDataService, IEditorStatefulConfig} from '../../../../../common/interfaces';
import {ObservableService} from '../../../../../common/services';
import {StudentGraduationService} from '../../../../../core/data';
import {DetailsStatefulDirective} from '../../../../../common/base-classes';

@Component({
    selector: 'app-graduations.details',
    templateUrl: './graduation.details.component.html',
    styleUrls: ['./../../../events.component.scss'],
    providers: [GraduationDetailsConfig, StudentGraduationService, ObservableService],
})

export class GraduationDetailsComponent extends DetailsStatefulDirective<Graduation> implements OnInit {

    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

    private classes: StudentGraduation[] = [];
    private application: Profile;

    constructor(
        @Inject(GraduationDetailsConfig) config: IEditorStatefulConfig<Graduation>,
        @Inject(StudentGraduationService) private graduationSvc: IDataService<StudentGraduation>,
        private observableSvc: ObservableService,
    ) {
        super(config);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (this.queryParams.id) {
            this.graduationSvc.query(`graduationExpectedDateId=(${this.queryParams.id})`, '', 9999)
                .then((res: StudentGraduation[]) => this.classes = res)
                .catch((e) => this.onHttpError(e));
        }
    }

    onSave(form: { valid: boolean; _submitted: boolean; }): void {
        event.returnValue = false;
        if (form.valid) {
            super.save();
        } else {
            form._submitted = true;
            this.showLoadData = false;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    observableSource(keyword: string): Profile {
        return this.observableSvc.observableSourceProfile.bind(keyword);
    }

    setupGraduation(): void {
        if (this.application && this.application.id) {
            this.showLoadData = true;
            this.graduationSvc.select(this.application.id, 'appl')
                .then((res: StudentGraduation) => {
                    if (!res) {
                        res = new StudentGraduation();
                        res.applicationId = this.application.id;
                        res.graduationExpectedDateId = this.entity.id;
                        this.saveClassInfo(res);
                    } else {
                        if (res.graduationExpectedDate) {
                            this.showLoadData = false;
                            this.confirm.show(
                                'confirm',
                                `${this.application.firstName} ${this.application.lastName} has already graduation date set for ${new Date(res.graduationExpectedDate.date).toDateString()}. Would you like to set new date?`,
                            )
                                .then((conf: boolean) => {
                                    if (conf) {
                                        res.graduationExpectedDateId = this.entity.id;
                                        this.saveClassInfo(res);
                                    } else {
                                        this.application = null;
                                    }
                                });
                        } else {
                            res.graduationExpectedDateId = this.entity.id;
                            this.saveClassInfo(res);
                        }
                    }
                })
                .catch((e) => this.onHttpError(e));
        }
    }

    saveClassInfo(classInfo: StudentGraduation): void {
        this.showLoadData = true;
        const p = classInfo.id ? this.graduationSvc.update(classInfo) : this.graduationSvc.create(classInfo);
        p.then((c: StudentGraduation) => {
            const hasUser = this.classes.find((x: StudentGraduation) => x.applicationId === c.applicationId);
            if (!hasUser ) {
                this.classes.push(c);
            }
            this.showLoadData = false;
            this.application = null;
        })
            .catch((e) => this.onHttpError(e));
    }
}
