import {Inject, Injectable, Injector} from '@angular/core';
import {IComponentConfig, IDataService} from '../../../common/interfaces';
import {MilitaryBase} from '../../../core/model/properties';
import {MilitaryBaseService} from './military-base.service';

@Injectable()
export class MilitaryBaseConfig implements IComponentConfig<MilitaryBase>{
  cls: new () => any = MilitaryBase;
  componentTitle = 'Military base';
  includes = 'null';
  constructor(
    @Inject(MilitaryBaseService) public dataSvc: IDataService<MilitaryBase>,
    public injector: Injector,
  ) { }
}
