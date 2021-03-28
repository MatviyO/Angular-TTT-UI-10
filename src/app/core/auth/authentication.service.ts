import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppUser, UserRole } from '../model';
import {IAuthenticationService} from '../../common/interfaces';


@Injectable()
export class AuthenticationService implements IAuthenticationService {
  protected http: HttpClient;
  // private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  protected readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-app-name' : 'ttt' });

  constructor(
        protected injector: Injector,
    ) {
        this.http = injector.get(HttpClient);
    }

    login(userLogin: string, password: string): Observable<boolean> {
        return this.http.post('/api/users/signin', JSON.stringify({ Login: userLogin, Password: password }), { headers: this.headers })
          .pipe(map((response: AppUser) => {
                return (response && response.role >= UserRole.Admin);
            },
                error => {
                    return false;
                }));
    }

    logout(): Promise<any> {
        return this.http.post('/api/users/signout', '{}', { headers: this.headers })
            .toPromise()
            .then(res => {
                return true;
            });

    }

}
