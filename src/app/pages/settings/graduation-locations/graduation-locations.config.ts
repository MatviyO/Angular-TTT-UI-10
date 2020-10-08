import { Injectable, Inject, Injector } from '@angular/core';

import { GraduationLocationsService } from './graduation-locations.service';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {GraduationLocation} from '../../../core/model/properties';

@Injectable()
export class GraduationLocationConfig implements IEditorConfig<GraduationLocation> {
    cls: new () => any  = GraduationLocation;
    componentTitle = 'Graduation location';
    includes = 'null';

    constructor(
        @Inject(GraduationLocationsService) public dataSvc: IDataService<GraduationLocation>,
        public injector: Injector,
    ) {}
}
