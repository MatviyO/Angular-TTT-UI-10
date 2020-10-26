import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {ProgramExit} from '../../../../../../core/model/properties';

@Injectable()
export class ExitsService {
    private url = 'api/Applications';  // URL to web api
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    exit(profileId: number, rowVersion: string, exit: ProgramExit): Promise<ProgramExit> {
        return this.http
            .post(`${this.url}/${profileId}/ExitProgram?rv=${encodeURIComponent(rowVersion)}`,
            JSON.stringify(exit),
            { headers: this.headers })
            .toPromise()
            .then(res => res.json() as ProgramExit)
            .catch(this.handleError);
    }

    enter(profileId: number, rowVersion: string): Promise<ProgramExit> {
        return this.http
            .post(`${this.url}/${profileId}/ReEnterProgram?rv=${encodeURIComponent(rowVersion)}`,
            null,
            { headers: this.headers })
            .toPromise()
            .then()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
