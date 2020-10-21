import {Inject, Injectable, Injector} from '@angular/core';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {InterviewOutcome} from '../../../core/model/properties';
import {InterviewOutcomeService} from './interview-outcome.service';

@Injectable()
export class InterviewOutcomeConfig implements IEditorConfig<InterviewOutcome>{
  cls: new() => any = InterviewOutcome;
  componentTitle = 'Interview outcome';
  constructor(@Inject(InterviewOutcomeService) public dataSvc: IDataService<InterviewOutcome>,
              public injector: Injector
              ) {
  }
}
