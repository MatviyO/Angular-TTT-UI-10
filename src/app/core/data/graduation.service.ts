import { Injectable, Injector } from '@angular/core';
import {StudentGraduation} from '../model';
import {BaseDataService} from '../../common/services';



@Injectable()
export class StudentGraduationService extends BaseDataService<StudentGraduation> {
    constructor(injector: Injector) {
        // super(injector, 'api/ClassesInformation');
        super(injector, 'api/Graduations');
    }
}
