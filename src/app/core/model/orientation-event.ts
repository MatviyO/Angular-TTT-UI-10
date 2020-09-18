import {BaseAddressUnDeletable, BaseEntityUnDeletable, BaseEntityWithApplRef} from '../../common/entities';

export class OrientationEvent extends BaseAddressUnDeletable {
    date: Date;
    baseId: number;
    base: BaseEntityUnDeletable;
    attendees: OrientationEventApplication[];

    constructor() {
        super();
        this.attendees = [];
    }
}

export class OrientationEventApplication extends BaseEntityWithApplRef {
    eventId: number;
    event: OrientationEvent;
    attended: boolean;
    confirmed: boolean;
    notes: string;
}
