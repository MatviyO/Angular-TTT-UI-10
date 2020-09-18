import { IEditorState, IEditorStateExt } from './IStateConfig';

export interface IEditor<T> {
    getData(id: number): Promise<T>;
    save(): Promise<T>;
    onDataLoaded(callback: (T) => void): void;
    onDataSaved(callback: (T) => void): void;
}

export interface IEditorStateful<T> {

    saveState(name: string, urlPrefix: string, data?: IEditorStateExt): void;
    loadState(key: string): void;
    navigate(): void;
}

export interface IEditorWithTriggers<T> {
    onTriggerLoaded(callback: (T) => void): void;
    getTriger(entity: T, category: string): void;
}
