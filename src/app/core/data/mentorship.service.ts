import { Injectable, Injector } from '@angular/core';
import {BaseDataService} from '../../common/services';
import {Mentorship} from '../model';



@Injectable()
export class MentorshipService extends BaseDataService<Mentorship> {
    constructor(injector: Injector) {
        super(injector, 'api/mentors');
    }
}
