import { Injector } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { IDataService, IUrlProvider, ICache } from '../interfaces';
import { BaseEntity, BaseEntityUnDeletable, BaseEntityCollection } from '../entities';
import { MemoryCache, UrlProvider, genKey } from '../utils';


export class BaseDataService<T extends BaseEntity> implements IDataService<T> {

  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  protected http: HttpClient;
  protected cache: ICache;
  protected urlProvider: IUrlProvider;

  constructor(
    protected injector: Injector,
    protected url: string,
    protected defaultFilter: string = null,
  ) {
    this.http = injector.get(HttpClient);
    this.cache = injector.get(MemoryCache);
    this.urlProvider = injector.get(UrlProvider);
  }

  queryWithTotal(filter: string = '', order: string = '', take: number = 20, skip: number = 0, args: any[] = [], includes: string = null, selectJSONPath: string = null):
    Promise<BaseEntityCollection<T>> {
    return this.http.get<BaseEntityCollection<T>>(this.urlProvider.query(this.url, filter, order, take, skip, args, this.defaultFilter, includes, selectJSONPath, true))
      .toPromise()
      .catch(this.handleError);
  }

  query(filter: string = '', order: string = '', take: number = 20, skip: number = 0, args: any[] = [], includes: string = null, selectJSONPath: string = null):
    Promise<T[]> {
    return this.http.get<T[]>(this.urlProvider.query(this.url, filter, order, take, skip, args, this.defaultFilter, includes, selectJSONPath))
      .toPromise()
      .catch(this.handleError);
  }

  select(id: number, selector: string = '', includes: string = null): Promise<T> {
    if (selector) {
      return this.getBySelector(id, selector, includes);
    }

    return this.http.get<T>(this.urlProvider.select(this.url, id, includes))
      .toPromise()
      .catch(this.handleError);
  }

  private getBySelector(id: number, selector: string, includes: string = null): Promise<T> {

    return this.http.get<T[]>(this.urlProvider.selectByPrefix(this.url, id, selector, this.defaultFilter, includes))
      .toPromise()
      .then(response => {
        return response.length > 0 ? response[0] : null;
      })
      .catch(this.handleError);
  }

  update(obj: T, _url: string = null): Promise<T> {
    const url = _url ? _url : this.urlProvider.update(this.url, obj.id, obj.rowVersion);
    return this.http
      .put<T>(url, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => {
        this.cache.invalidate(genKey([_url ? _url : this.url]));
        return res;
      })
      .catch((e) => {
        return this.handleError(e);
      });
  }

  create(obj: T, _url: string = null): Promise<T> {
    const url = _url ? _url : this.urlProvider.create(this.url);
    return this.http
      .post<T>(url, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => {
        this.cache.invalidate(genKey([_url ? _url : this.url]));
        return res;
      })
      .catch((e) => this.handleError(e));
  }

  delete(obj: T, _url: string = null): Promise<null> {
    const url = _url ? _url : this.urlProvider.delete(this.url, obj.id);
    if (_url) {
      const options = {
        headers: this.headers,
        body: JSON.stringify(obj),
      };
      return this.http
        .delete(url, options)
        .toPromise()
        .then(() => {
          this.cache.invalidate(genKey([_url ? _url : this.url]));
          return null;
        })
        .catch(this.handleError);
    } else {
      return this.http.delete(url, { headers: this.headers })
        .toPromise()
        .then(() => {
          this.cache.invalidate(genKey([_url ? _url : this.url]));
          return null;
        })
        .catch(this.handleError);
    }
  }

  // async requestFile(url: string): Promise<any> {
  //    return this.http.get<BaseEntityCollection<T>>(this.urlProvider.query(url))
  //     .toPromise()
  //     // .then(response => this.saveAsBlob(response))
  //     .catch(error => this.handleError(error));
  //     // .toPromise()
  //     // .then((res1: any) => {
  //     //     console.log(res1);
  //     //     res1.blob();

  //     // })
  //     // .catch(this.handleError);
  //     // if (res) {

  //     //     return res.blob();
  //     // }
  // }


  protected handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}

export class BaseDataServiceUnDeletable<T extends BaseEntityUnDeletable> extends BaseDataService<T> {

  create(obj: T): Promise<T> {
    obj.isActive = true;
    return super.create(obj);
  }

  delete(obj: T): Promise<any> {
    // obj.isActive = false;
    obj.isActive = !obj.isActive;
    return super.update(obj);
  }

  // restore(obj: T): Promise<any> {
  //     obj.isActive = true;
  //     return super.update(obj);
  // }

}
