import { Injector } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { BaseEntity, BaseEntityCollection } from '../entities';
import { IResourceService, ICache, IUrlProvider } from '../interfaces';
import { MemoryCache, UrlProvider, genKey } from '../utils';

export class ResourceServiceBase<T extends BaseEntity> implements IResourceService<T> {

  protected readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-app-name': 'ttt' });

  protected http: HttpClient;
  protected cache: ICache;
  protected urlProvider: IUrlProvider;

  constructor(
    protected injector: Injector,
    private url: string,
    protected dependencies: string[] = [],
    protected cacheMinutes: number = 10,
    protected defaultFilter = null,
  ) {
    this.http = injector.get(HttpClient);
    this.cache = injector.get(MemoryCache);
    this.urlProvider = injector.get(UrlProvider);

  }

  query(filter: string = '', order: string = '', args: any[] = [], includes: string = null, selectJSONPath: string = null, noCaching: boolean = false): Promise<T[]> {
    const key = genKey([this.url, filter, order]);
    if (this.cache.keyExist(key) && !noCaching) {
      return Promise.resolve(this.cache.get(key));
    }

    return this.http.get<T[]>(this.urlProvider.query(this.url, filter, order, null, null, args, this.defaultFilter, includes, selectJSONPath), { headers: this.headers })
      .toPromise()
      .then(response => {
          this.cache.cache(key, response, this.cacheMinutes, this.dependencies);
          return response;
        },
      )
      .catch(this.handleError);
  }

  count(filter: string): Promise<number> {
    return this.http.get<BaseEntityCollection<T>>(this.urlProvider.count(this.url, filter, this.defaultFilter), { headers: this.headers })
      .toPromise()
      .then(response => {
          const x = response.data || response;
          return x;
        },
      )
      .catch(this.handleError);

  }


  protected handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
