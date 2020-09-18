import {BaseEntityUnDeletable} from '../../../common/entities';

export class NonPlacementReason extends BaseEntityUnDeletable {
    description: string;
    type: number = 0;
    slsdCode: string;

}
