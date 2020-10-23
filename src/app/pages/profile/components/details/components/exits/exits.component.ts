import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { INotificationService, NotificationService, IEditorStateExt } from '@ttt/common';
import { ExitReasonsService, ExitReason, Profile, ProgramExit } from '@ttt/core';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'exits',
    templateUrl: './exits.component.html',
    styleUrls: ['./exits.component.scss'],
})

export class ExitsComponent implements OnInit {
    @Input() entity: Profile;
    @Output() onChange = new EventEmitter();
    @Output() onNavigate: EventEmitter<IEditorStateExt> = new EventEmitter<IEditorStateExt>();
    @Output() onError = new EventEmitter();

    originalItemEdit: ProgramExit;
    showLoadData: boolean = false;
    exitProgram: boolean = false;
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

    navigate(itemEdit: ExitReason) {
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
