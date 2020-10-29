import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationMapService {
  url: string;

  constructor(protected http: HttpClient) { }

  query(id: number, distance: number): Promise<any[]> {
    const url = `api/Applications/${id}/ClosestCompanies/${distance}`;

    return this.http.get<any[]>(`${url}`)
      .toPromise()
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
