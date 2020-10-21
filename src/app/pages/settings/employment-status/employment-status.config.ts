import { Injectable, Inject, Injector } from '@angular/core';

import { EmploymentStatusService } from './employment-status.service';
import {EmploymentStatus} from '../../../core/model/properties';
import {IDataService, IEditorConfig} from '../../../common/interfaces';

@Injectable()
export class EmploymentStatusConfig implements IEditorConfig<EmploymentStatus> {
  cls: new () => any = EmploymentStatus;
  componentTitle = 'Employment status';

  constructor(
    @Inject(EmploymentStatusService) public dataSvc: IDataService<EmploymentStatus>,
    public injector: Injector,
  ) { }
}
