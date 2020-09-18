export interface IResourceService<T> {
    query(filter?: string, order?: string, args?: any[], includes?: string, selectJSONPath?: string, noCaching?: boolean): Promise<T[]>;
    count(filter?: string): Promise<number>;
}
