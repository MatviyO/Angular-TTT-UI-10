import {Inject, Injectable, Injector} from '@angular/core';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {ExitReason} from '../../../core/model/properties';
import {ExitReasonsService} from './exit-reasons.service';

@Injectable()
export class ExitReasonsConfig implements IEditorConfig<ExitReason> {
  cls: new() => ExitReason;
  componentTitle = 'Exit reason';
  includes = 'null';
  constructor(@Inject(ExitReasonsService) public dataSvc: IDataService<ExitReason>,
              public injector: Injector
              ) {
  }
}
