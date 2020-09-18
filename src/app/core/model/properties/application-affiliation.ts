import {BaseEntity, BaseEntityUnDeletable} from '../../../common/entities';


export class AffiliationType extends BaseEntityUnDeletable {
    description: string;
    defaultDiscountId: number;
    canHaveSingleClass: boolean;
    constructor() {
        super();
        this.canHaveSingleClass = false;
    }
}

export class Affiliation extends BaseEntity {
    affiliationType: AffiliationType;
    affiliationTypeId: number;
    applicationId: number;
    formReceived: Date;
    formToAP: Date;
    classes: any[];
}
