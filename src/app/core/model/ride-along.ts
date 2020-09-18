import { OfficeLocation } from './properties';
import { Profile } from './';
import {BaseEntity} from '../../common/entities';

// export class RideAlongsHeader extends BaseEntity {
//     application?: Profile;
//     applicationId: number;
//     disclosureForm: boolean;

//     rideAlongs?: RideAlong[];

//     constructor () {
//         super();
//         this.rideAlongs = new Array<RideAlong>();
//     }
// }

// export class RideAlong extends BaseEntity {
//     date: Date;
//     feedbackId: number;
//     feedback = {};
//     notes: string;
//     officeLocationId: number;
//     officeLocation: OfficeLocation;
//     programType: number;
//     technicianName: string;
//     hasTrigger?: boolean = false;
// }


export class RideAlong extends BaseEntity {
    application: Profile;
    applicationId: number;
    programType: number;
    technicianName: string;
    status: RAStatus;
    officeLocationId: number;
    officeLocation: OfficeLocation;
    feedbackId: number;
    feedback: any;
    approvedDates: RideAlongDate[];
    requestedDates: RideAlongDate[];
    notes?: string;
    userNotes?: any;
    new?: boolean;
    collapse: boolean;
    constructor() {
        super();
        this.approvedDates = [];
        this.requestedDates = [];
    }
}

export enum RAStatus {
    Requested,
    Approved,
    Confirmed,
    Completed,
    UserCanceled,
    AdminCanceled,
}


export class RideAlongDate extends BaseEntity {
    date: Date;
    rideAlongId: number;
}
