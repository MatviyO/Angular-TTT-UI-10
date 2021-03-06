
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {UrlProvider} from '../../../../../common/utils';
import {Injectable} from '@angular/core';


@Injectable()
export class AssetsService {
  private url = 'api/assets';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-app-name' : 'ttt' });

  constructor(private http: HttpClient, protected urlProvider: UrlProvider) { }

  delete(id: number): Promise<void> {
    return this.http.delete(this.urlProvider.delete(this.url, id), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
