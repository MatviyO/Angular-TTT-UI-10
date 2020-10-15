import { Injectable, Inject, Injector } from '@angular/core';

import { AlternativeLocationService } from './alternativeLocations.service';
import {AlternativeLocation} from '../../../../../../../core/model/properties';
import {IDataService, IEditorConfig} from '../../../../../../../common/interfaces';

@Injectable()
export class AlternativeLocationConfig implements IEditorConfig<AlternativeLocation> {
    cls: new () => any = AlternativeLocation;
    componentTitle = 'Alternative location';

    constructor(
        @Inject(AlternativeLocationService) public dataSvc: IDataService<AlternativeLocation>,
        public injector: Injector,
    ) { }
}
