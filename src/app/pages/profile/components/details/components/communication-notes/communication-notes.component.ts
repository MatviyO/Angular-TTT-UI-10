import { Component, ViewChild, Input , Output, EventEmitter } from '@angular/core';
import { ApplicationNoteService } from './communication-notes.service';
import {CommunicationHistory} from '../../../../../../core/model';

class CommunicationHistoryNote extends CommunicationHistory {
    index: number;
}

@Component({
    selector: 'app-communication-notes',
    templateUrl: './communication-notes.component.html',
    styleUrls: ['./communication-notes.component.scss'],
    providers: [ApplicationNoteService],
})

export class ApplicationNoteComponent {

    @Output() onError = new EventEmitter();
    scrolled: number;
    notes: any = [];
    applicationId: number;
    noCollapse = true;

    constructor(
        private applNoteSvc: ApplicationNoteService,
    ) {}

    load(notes: CommunicationHistory[], id: number): void {
        this.applicationId = id;
        this.notes = notes;
    }

    onSaved(item: CommunicationHistoryNote): void {
        if (item) {
            if (item.id) {
                this.applNoteSvc.update(item)
                    .then(res => this.notes[item.index] = res)
                    .catch(err => this.onError.emit(err));
            } else {
                item.applicationId = this.applicationId;
                this.applNoteSvc.create(item)
                    .then(res => this.notes[item.index] = res)
                    .catch(err => this.onError.emit(err));
            }
        }
    }
}
