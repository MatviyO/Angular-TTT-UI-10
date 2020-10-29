import { Component, Output, OnInit, Input, EventEmitter, HostListener } from '@angular/core';
import {BaseNotes} from '../../../common/entities';

class NoteDTO extends BaseNotes {
    edit: boolean;

}

@Component({
    selector: 'app-collapse-note',
    templateUrl: 'collapseNote.component.html',
    styleUrls: ['collapseNote.component.scss'],
})

export class CollapseNoteComponent implements OnInit {

    @Output() onSaved = new EventEmitter();
    @Input() noteArray;
    @Input() itemSaved;
    @Input() noCollapse;
    @Input() doubleBtnNewNote;

    scrolled: number;
    _notes: any[] = [];
    showNotes = true;
    addNote = false;
    showBtnAddNote = false;

    constructor() { }


    ngOnInit(): void {
        if (!this.noCollapse && this.noteArray.length === 0 || !this.noCollapse && this.noteArray.length > 3) {
            this.showNotes = false;
        }
    }

    @HostListener('window:scroll')

    onWindowScroll(): any {
        if (this.doubleBtnNewNote) {
            this.scrolled = (window.pageYOffset || document.documentElement.scrollTop);
            this.showBtnAddNote = (this.scrolled > 150);
        }
    }

    showNote(): void {
        if (this.noteArray.length > 0 && !this.noCollapse) {
            this.showNotes = !this.showNotes;
        }
    }

    saved(item, i: number): void {
        item.index = i;
        this.onSaved.emit(item);
        this.addNote = false;
        item.edit = false;
        this.addNote = false;
    }

    newNote(): void {
        this.addNote = true;
        this.showNotes = true;
        const note = new NoteDTO();
        note.created = new Date();
        note.edit = true;
        this.noteArray.push(note);
    }

    editNote(note: NoteDTO): void {
        note.edit = true;
        this._notes.push(Object.assign({}, note));
    }

    cancelNote(item: NoteDTO, i: number): void {
        item.edit = false;
        if (!item.id) {
            this.addNote = false;
            this.noteArray.splice(this.noteArray.length - 1, 1);
            if (this.noteArray.length === 0) {
                this.showNotes = false;
            }
            return;
        }
        const index = this._notes.findIndex(x => x.id === item.id);
        if (index >= 0) {
            this.noteArray[i] = this._notes[index];
            this._notes[index].edit = false;
            this._notes.splice(index, 1);
        }
    }

}
