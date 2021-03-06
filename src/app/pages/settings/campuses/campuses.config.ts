import { Injectable, Inject, Injector } from '@angular/core';
import {Campus} from '../../../core/model/properties';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {CampusesService} from './campuses.service';


@Injectable()
export class CampusConfig implements IEditorConfig<Campus> {
  cls: new () => any = Campus;
  componentTitle = 'Campus';
  includes = 'null';
  constructor(
    @Inject(CampusesService) public dataSvc: IDataService<Campus>,
    public injector: Injector) {
  }
}
