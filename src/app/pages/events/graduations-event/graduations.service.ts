import { Injectable, Injector } from '@angular/core';
import {BaseDataService} from '../../../common/services';
import {Graduation} from '../../../core/model/properties';

@Injectable()
export class GraduationsService extends BaseDataService<Graduation> {

    constructor(injector: Injector) {
        super(injector, 'api/ClassesGraduationDates');
    }
}
