export interface IList<T> {
    skip: number;
    take: number;
    total: number;

    showLoadData: boolean;

    entities: T[];

    onDataLoaded(callback: (T) => void): void;
    loadMore(): void;
    getData(args: any[]): void;
    onHttpError(error: any): void;
}

export interface ISortableList<T> {

    sort: any;

    onSearch(): void;
    onSort(column: string): void;

    getFilterFormatted(): string;
    getSortFormatted(): string;
}

export interface IEditableList<T> {
    entity: T;
    _items: any[];
    validation: boolean;

    edit(item: T): void;
    cancelEdit(item: T, i: number): void;
    save(entity: T): Promise<T>;
    delete(obj: T): Promise<void>;
    onDataSaved(callback: (T) => void): void;
    onSave(item, form): void;
}

export interface IListWithTriggers<T> {
    getTriggers(triggersType: string): void;
    addStatusColor(itemId: number): string;
}
