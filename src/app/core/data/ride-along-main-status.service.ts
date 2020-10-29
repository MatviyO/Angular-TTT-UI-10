import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../model';


@Injectable()
export class RideAlongStatusMainService {
  constructor(protected http: HttpClient) { }

  approved(id: number, obj: any): Promise<Profile> {
    const _obj = { id, dates: obj.approvedDates, rv: obj.rowVersion };
    return this.http.put(`api/ApproveRideAlong`, _obj)
      .toPromise()
      .catch(this.handleError);
  }

  complete(obj: any): Promise<any> {
    return this.http.put(`api/RideAlongs/${obj.id}/Complete?rv=${obj.rowVersion}`, obj.rowVersion)
      .toPromise()
      .catch(this.handleError);
  }

  cancel(obj: any): Promise<any> {
    return this.http.put(`api/RideAlongs/${obj.id}/Cancel?rv=${obj.rowVersion}`, obj.rowVersion)
      .toPromise()
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
