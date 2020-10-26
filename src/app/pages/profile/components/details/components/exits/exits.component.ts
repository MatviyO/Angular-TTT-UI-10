import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {IEditorStateExt, INotificationService} from '../../../../../../common/interfaces';
import {ExitReason, ProgramExit} from '../../../../../../core/model/properties';
import {NotificationService} from '../../../../../../common/services';
import {Profile} from '../../../../../../core/model';
import {ExitReasonsService} from '../../../../../../core/data';

@Component({
    selector: 'app-exits',
    templateUrl: './exits.component.html',
    styleUrls: ['./exits.component.scss'],
})

export class ExitsComponent implements OnInit {
    @Input() entity: Profile;
    @Output() onChange = new EventEmitter();
    @Output() onNavigate: EventEmitter<IEditorStateExt> = new EventEmitter<IEditorStateExt>();
    @Output() onError = new EventEmitter();

    originalItemEdit: ProgramExit;
    showLoadData  = false;
    exitProgram = false;
    exit = new ProgramExit();
    exitReasons: ExitReason[];

    constructor(
        private exitReasonsSvc: ExitReasonsService,
        @Inject(NotificationService) private notificationSvc: INotificationService,
    ) { }


    ngOnInit(): void {
        this.exitReasonsSvc.query()
            .then(data => this.exitReasons = data)
            .catch((error: any) => this.handleError(error));
    }

    onProgramExit(form: { valid: boolean; _submitted: boolean; }): void {
        this.originalItemEdit = Object.assign({}, this.exit);
        if (form.valid) {
            if (this.exit.exitDate) {
                this.onChange.emit(this.exit);
                this.exitProgram = false;
                this.exit = new ProgramExit();
            }
        } else {
            form._submitted = true;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    restore(data: IEditorStateExt): void {
        if (data && data.editingItem) {
            this.exitProgram = true;
            this.exit = data.editingItem;
        }
    }

    navigate(itemEdit: ExitReason): void {
        const data: IEditorStateExt = {
            editingItem: itemEdit,
            itemBkp: this.originalItemEdit,
            itemIndex: -1,
            section: 'exit',
        };
        this.onNavigate.emit(data);
    }

    handleError(error: any): void {
        this.onError.emit(error);
    }
}
