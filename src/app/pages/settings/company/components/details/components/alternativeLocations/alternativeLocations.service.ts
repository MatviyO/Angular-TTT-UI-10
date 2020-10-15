import { Injectable, Injector } from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../../../../../common/services';
import {AlternativeLocation} from '../../../../../../../core/model/properties';


@Injectable()
export class AlternativeLocationService extends BaseDataServiceUnDeletable<AlternativeLocation> {

    constructor(injector: Injector) {
        super(injector, 'api/CompanyAlternateLocations');
    }
}
