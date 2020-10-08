import { Injectable, Injector } from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {NonPlacementReason} from '../../../core/model/properties';


@Injectable()
export class NonPlacementReasonService extends BaseDataServiceUnDeletable<NonPlacementReason> {

    constructor(injector: Injector) {
        super(injector, 'api/EmploymentNonPlacementReasons');
    }
}
