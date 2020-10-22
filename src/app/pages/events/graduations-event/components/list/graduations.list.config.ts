import { Injectable, Inject, Injector } from '@angular/core';

import { GraduationsService } from '../../graduations.service';
import {Graduation} from '../../../../../core/model/properties';
import {IComponentConfig, IDataService} from '../../../../../common/interfaces';

@Injectable()
export class GraduationsListConfig implements IComponentConfig<Graduation> {
    componentTitle = 'Graduation Dates';
    includes = 'Graduations';
    selectJSONPath = 'id;date;graduations[*]';

    constructor(
        @Inject(GraduationsService) public dataSvc: IDataService<Graduation>,
        public injector: Injector,

    ) { }
}
