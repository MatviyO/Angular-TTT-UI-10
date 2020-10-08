import { Injectable, Injector } from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {GraduationLocation} from '../../../core/model/properties';

@Injectable()
export class GraduationLocationsService extends BaseDataServiceUnDeletable<GraduationLocation> {

    constructor(injector: Injector) {
        super(injector, 'api/ClassesGraduationLocations');
    }
}
