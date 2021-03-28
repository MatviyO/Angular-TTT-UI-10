import { Injectable, Injector } from '@angular/core';
import { ApplicationType, Profile } from '../model';
import {BaseDataService} from '../../common/services';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class ProfileService extends BaseDataService<Profile> {

  protected readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-app-name' : 'ttt' });
  constructor(injector: Injector) {
    super(injector, 'api/Applications', `type=="3"`);
  }

  select(id: number): Promise<Profile> {
    const url = `${this.urlProvider.select(this.url, id)}`;
    return this.http.get<Profile>(url, { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  create(obj: Profile): Promise<Profile> {
    obj.type = ApplicationType.Military;
    return super.create(obj);
  }
}
