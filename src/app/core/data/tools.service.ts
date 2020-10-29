import { Injectable, Injector } from '@angular/core';
import {Tools} from '../model';
import {BaseDataService} from '../../common/services';



@Injectable()
export class ToolsService extends BaseDataService<Tools> {
  constructor(injector: Injector) {
    super(injector, 'api/ToolsOrders');
  }
}
