import { Injectable, Injector } from '@angular/core';
import {Attendee, Reservation, ScheduledClass} from '../model';
import {BaseDataService} from '../../common/services';



@Injectable()
export class ClassesService extends BaseDataService<ScheduledClass> {
    constructor(injector: Injector) {
        super(injector, 'api/Classes');
    }
}

@Injectable()
export class ClassReservationsService extends BaseDataService<Reservation> {
    constructor(injector: Injector) {
        super(injector, 'api/ClassReservations');
    }
}

@Injectable()
export class ClassAttendeesService extends BaseDataService<Attendee> {
    constructor(injector: Injector) {
        super(injector, 'api/ClassAttendees');
    }
}
