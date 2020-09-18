import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RideAlongStatusMainService {

    constructor(protected http: HttpClient) {
    }

    approved(id: number, obj: any): Promise<any> {
        // return this.http.put(`api/RideAlongs/${id}/Approve`, obj)
        const _obj = {
            id,
            dates: obj.approvedDates,
            rv: obj.rowVersion,

        };
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

    // complete(obj: any): Promise<any> {
    //     // return super.requestJSON(`${this.url}/${obj.id}/Complete?rv=${obj.rowVersion.replace('+','%2B')}`, 'PUT', obj);
    //     return this.http.get('api/settings')
    //     .toPromise()
    //     .catch(this.handleError);
    // }

}
