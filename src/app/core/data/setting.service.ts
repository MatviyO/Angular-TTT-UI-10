import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Setting} from '../model/properties';


@Injectable()
export class SettingService {
  constructor(protected http: HttpClient) { }

  query(): Promise<Setting> {
    return this.http.get('api/settings')
      .toPromise()
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
