import {BaseAddressUnDeletable, BaseEntityUnDeletable, BaseEntityWithApplRef} from '../../common/entities';

export class RegistrationEvent extends BaseAddressUnDeletable {
    date: Date;
    baseId: number;
    base: BaseEntityUnDeletable;
    registrationAllowed: boolean;
    attendees: RegistrationEventApplication[];

    constructor() {
        super();
        this.attendees = [];
    }
}

export class RegistrationEventApplication extends BaseEntityWithApplRef {
    eventId: number;
    event: RegistrationEvent;
    attended: boolean;
    confirmed: boolean;
    notes: string;
}
