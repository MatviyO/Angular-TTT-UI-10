import {Injectable, Injector} from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {Reference} from '../../../core/model/properties';

@Injectable()
export class ReferencesService extends BaseDataServiceUnDeletable<Reference> {
  constructor(injector: Injector) {
    super(injector, 'api/ApplicationHearAboutProgramSources');
  }
}
