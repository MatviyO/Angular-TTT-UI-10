import {Inject, Injectable, Injector} from '@angular/core';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {MilitaryBranch} from '../../../core/model/properties';
import {MilitaryBranchService} from './military-branch.service';

@Injectable()
export class MilitaryBranchConfig implements IEditorConfig<MilitaryBranch> {
  cls: new () => any = MilitaryBranch;
  componentTitle = 'Military Branch';
  includes = 'null';

  constructor(
    @Inject(MilitaryBranchService) public dataSvc: IDataService<MilitaryBranch>,
    public injector: Injector,
  ) {}
}
