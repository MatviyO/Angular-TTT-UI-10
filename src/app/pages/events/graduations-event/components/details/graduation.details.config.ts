import { Injectable, Inject, Injector } from '@angular/core';

import { GraduationsService } from '../../graduations.service';
import {Graduation} from '../../../../../core/model/properties';
import {IDataService, IEditorStatefulConfig} from '../../../../../common/interfaces';

@Injectable()
export class GraduationDetailsConfig implements IEditorStatefulConfig<Graduation> {
    navigationTitle = 'Graduation event';
    navigationUrlPrefix = 'events/graduations';
    cls: new () => Graduation = Graduation;
    componentTitle = 'Graduation Date';

    constructor(
        @Inject(GraduationsService) public dataSvc: IDataService<Graduation>,
        public injector: Injector,
    ) { }
}
