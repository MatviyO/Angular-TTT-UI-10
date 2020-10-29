import { Injectable, Injector } from '@angular/core';
import { ApplicationType, Profile } from '../model';
import {BaseDataService} from '../../common/services';

@Injectable()
export class ProfileService extends BaseDataService<Profile> {

  constructor(injector: Injector) {
    super(injector, 'api/Applications', `type=="3"`);
  }

  select(id: number): Promise<Profile> {
    const url = `${this.urlProvider.select(this.url, id)}`;
    return this.http.get<Profile>(url)
      .toPromise()
      .catch(this.handleError);
  }

  create(obj: Profile): Promise<Profile> {
    obj.type = ApplicationType.Military;
    return super.create(obj);
  }
}
