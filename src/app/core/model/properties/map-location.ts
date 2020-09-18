import {BaseEntityUnDeletable} from '../../../common/entities';

export class MapLocation extends BaseEntityUnDeletable {
    applicationId: number;
    closestCompanies: ClosestCompanies[];
    latitude: number;
    longitude: number;
    name: string;
    priority: number;

    constructor () {
        super();
        this.closestCompanies = new Array<ClosestCompanies>();
    }
}

export class ClosestCompanies extends BaseEntityUnDeletable {
    companyId: number;
    distance: number;
    latitude: number;
    longitude: number;
    name: string;
}
