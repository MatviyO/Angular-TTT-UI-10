import { ScheduledClass, Profile, Reservation, AppUser, UserRole, ApplicationType } from '../model';
import { AppUserService } from '../data/appUser.service';
import { Injectable, Inject } from '@angular/core';
import { IDataService } from '../../common';
import { ClassReservationsService } from '../data';

@Injectable()
export class ClassReservationsHelper {

    constructor(
        @Inject(AppUserService) private appUserSvc: IDataService<AppUser>,
        @Inject(ClassReservationsService) private reservationsSvc: IDataService<Reservation>,
    ) {
    }

    reserveClassSpot(cls: ScheduledClass, application: Profile): Promise<Reservation> {
        if (cls.militarySpotsLeft === 0) {
            Promise.reject('No military spots left.');
        }
        return this._reserve(cls.id, application.id);
        // if (application && application.id) {
        //     if (!application.appUser) {
        //         return this._createUser(application)
        //             .then(res => {
        //                 return this._reserve(cls.id, res.id);
        //             })
        //     } else {
        //         return this._reserve(cls.id, application.appUser.id);
        //     }
        // }
    }

    releaseClassSpot = (reservation: Reservation): Promise<any> => this.reservationsSvc.delete(reservation);

    // private _createUser(appl: Profile): Promise<AppUser> {
    //     let _newUser = new AppUser();
    //     _newUser.applicationId = appl.id;
    //     _newUser.firstName = appl.firstName;
    //     _newUser.lastName = appl.lastName;
    //     _newUser.email = appl.email;
    //     _newUser.login = appl.email;
    //     _newUser.role = UserRole.Basic;
    //     _newUser.type = ApplicationType.Military;
    //     _newUser.isActive = true;
    //     return this.appUserSvc.create(_newUser);
    // }

    private _reserve(classId: number, appUserId: number): Promise<Reservation> {
        const reservation = new Reservation();
        reservation.appUserId = appUserId;
        reservation.classId = classId;
        reservation.isCampbellStrong = false;
        return this.reservationsSvc.create(reservation);
    }
}
