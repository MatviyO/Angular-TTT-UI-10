import {Inject, Injectable, Injector} from '@angular/core';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {Feedback} from '../../../core/model/properties';
import {FeedbacksService} from './feedbacks.service';

@Injectable()
export class FeedbacksConfig implements IEditorConfig<Feedback>{
  cls: new() => any =  Feedback;
  componentTitle = 'Feedback';
  includes = 'null';
  constructor( @Inject(FeedbacksService) public dataSvc: IDataService<Feedback>,
               public injector: Injector
  ) {
  }
}
