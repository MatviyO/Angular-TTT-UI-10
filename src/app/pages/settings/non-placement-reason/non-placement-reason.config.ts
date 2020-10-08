import { Injectable, Inject, Injector } from '@angular/core';
import { NonPlacementReasonService } from './non-placement-reason.service';
import {IDataService, IEditorConfig} from '../../../common/interfaces';
import {NonPlacementReason} from '../../../core/model/properties';

@Injectable()
export class NonPlacementReasonConfig implements IEditorConfig<NonPlacementReason> {
    cls: new () => any = NonPlacementReason;
    componentTitle = 'Non-placement reason';
    includes = 'null';

    constructor(
        @Inject(NonPlacementReasonService) public dataSvc: IDataService<NonPlacementReason>,
        public injector: Injector,
    ) { }
}
