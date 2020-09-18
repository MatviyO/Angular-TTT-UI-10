import { Observable } from 'rxjs';


export interface IAuthenticationService {
    login(username: string, password: string): Observable<boolean>;
    logout(): void;
    // canActivate(): boolean;
}
