import {Inject, Injectable, Injector} from '@angular/core';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {Interview} from '../../../core/model';
import {InterviewTypeService} from './interview-type.service';

@Injectable()
export class InterviewTypeConfig implements IEditorConfig<Interview> {
  cls: new() => any =  Interview;
  componentTitle = 'Interview type';
  includes = 'null';

  constructor(@Inject(InterviewTypeService) public dataSvc: IDataService<Interview>,
              public injector: Injector) {
  }

}
