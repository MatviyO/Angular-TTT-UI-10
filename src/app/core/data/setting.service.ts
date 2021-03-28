import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Setting} from '../model/properties';


@Injectable()
export class SettingService {
  constructor(protected http: HttpClient) { }

  protected readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-app-name' : 'ttt' });
  query(): Promise<Setting> {
    return this.http.get('api/settings', { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
