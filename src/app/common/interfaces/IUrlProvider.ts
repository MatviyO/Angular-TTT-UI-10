export interface IUrlProvider {
    query(baseUrl: string, filter?: string, order?: string, take?: number, skip?: number, args?: any[], defaultFilter?: string, includes?: string, selectJSONPath?: string, withTotal?: boolean): string;
    count(baseUrl: string, filter: string, defaultFilter?: string): string;
    select(baseUrl: string, id: number, includes?: string ): string;
    selectByPrefix(baseUrl: string, id: number, prefix: string, defaultFilter?: string): string;
    create(baseUrl: string): string;
    update(baseUrl: string, id: number, rowVersion: string): string;
    delete(baseUrl: string, id: number): string;
}
