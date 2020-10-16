import { Injectable, Injector } from '@angular/core';
import {Campus} from '../../../core/model/properties';
import {BaseDataServiceUnDeletable} from '../../../common/services';


@Injectable()
export class CampusesService extends BaseDataServiceUnDeletable<Campus> {
  constructor(injector: Injector) {
    super(injector, '\'api/ClassCampuses');
  }
}
