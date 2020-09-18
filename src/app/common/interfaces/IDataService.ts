import { IEntityCollection } from './IEntityCollection';

export interface IDataService<T> {
  queryWithTotal(filter?: string, order?: string, take?: number, skip?: number, args?: any[], includes?: string, selectJSONPath?: string): Promise<IEntityCollection<T>>;
  query(filter?: string, order?: string, take?: number, skip?: number, args?: any[], includes?: string, selectJSONPath?: string): Promise<T[]>;
  select(id: number, selector?: string, includes?: string): Promise<T>;
  update(obj: T): Promise<T>;
  create(obj: T): Promise<T>;
  delete(obj: T): Promise<any>;
}
