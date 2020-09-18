import { Params } from '@angular/router';
import { BaseEntity } from '../entities';

export interface IEditorStateExt {
    editingItem: any;
    itemBkp: any;
    itemIndex: number;
    section: string;
}

export interface IEditorState {
    entity: BaseEntity;
    query: Params;
    data: IEditorStateExt;
}
