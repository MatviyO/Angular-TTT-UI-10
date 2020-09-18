
import { EmploymentCompany } from './job-tracking-stage';
import { Profile } from './profile';
import { Attendee, Reservation } from './classes';
import {BaseAddressUnDeletable, BaseEntity} from '../../common/entities';

export class HousingTransportation extends BaseEntity {
    // applicationId: number;
    // application: Profile;
    classParticipant: Attendee | Reservation;
    classParticipantId: number;
    // needsTransport: boolean;
    needsHousing: boolean;
    isBooked: boolean;
    // ptdy: boolean;
    transportation: Transportation;
    transportationId: number;
    housingOptionId: number;
    housingOption: HouseTransportationOptions;
    startDate: Date;
    endDate: Date;
}

export class HouseTransportationOptions extends BaseAddressUnDeletable {
    isActive: boolean;
    name: string;
}

export class Transportation extends BaseEntity {
    isActive: boolean;
    description: string;
}
