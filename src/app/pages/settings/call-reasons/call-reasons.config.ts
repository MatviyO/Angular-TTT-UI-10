import {Inject, Injectable, Injector} from '@angular/core';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {CallReason} from '../../../core/model/properties';
import {CallReasonsService} from './call-reasons.service';

@Injectable()
export class CallReasonsConfig implements IEditorConfig<CallReason> {
  cls: new() => any = CallReason;
  componentTitle = 'Call reason';
  includes = 'null';

  constructor(@Inject(CallReasonsService) public dataSvc: IDataService<CallReason>,
              public injector: Injector) {
  }

}
