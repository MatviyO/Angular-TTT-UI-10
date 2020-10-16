
import { Injectable, Inject, Injector } from '@angular/core';
import {OfficeLocation} from '../../../core/model/properties';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {OfficeLocationService} from './office-locations.service';

@Injectable()
export class OfficeLocationsConfig implements IEditorConfig<OfficeLocation> {
  cls: new() => OfficeLocation;
  componentTitle = 'Office Location';
  includes = 'null';
  constructor(
    @Inject(OfficeLocationService) public dataSvc: IDataService<OfficeLocation>,
    public injector: Injector
  ) {
  }
}
