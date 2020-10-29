import { Injectable, Injector } from '@angular/core';
import {BaseDataService} from '../../common/services';
import {AppUser} from '../model';

@Injectable()
export class AppUserService extends BaseDataService<AppUser> {
  constructor(injector: Injector) {
    super(injector, 'api/users');
  }
}
