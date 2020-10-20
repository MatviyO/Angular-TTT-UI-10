import {Inject, Injectable, Injector} from '@angular/core';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {Reference} from '../../../core/model/properties';
import {ReferencesService} from './references.service';

@Injectable()
export class ReferencesConfig implements IEditorConfig<Reference>{
  cls: new() => Reference;
  componentTitle = 'Reference';
  includes = 'null';
  constructor(
    @Inject(ReferencesService) public dataSvc: IDataService<Reference>,
    public injector: Injector,
  ) { }
}
