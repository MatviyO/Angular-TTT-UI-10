import {Injectable, Injector} from '@angular/core';
import {IComponentConfig, IDataService} from '../../../common/interfaces';
import {MilitaryBase} from '../../../core/model/properties';

@Injectable()
export class MilitaryBaseConfig implements IComponentConfig<MilitaryBase>{
  componentTitle: string;
  dataSvc: IDataService<MilitaryBase>;
  injector: Injector;

}
