import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LocationMapService {
  url: string;
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-app-name' : 'ttt' });
  constructor(protected http: HttpClient) { }

  query(id: number, distance: number): Promise<any[]> {
    const url = `api/Applications/${id}/ClosestCompanies/${distance}`;

    return this.http.get<any[]>(`${url}`, { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
