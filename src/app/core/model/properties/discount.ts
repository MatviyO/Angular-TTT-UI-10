import {BaseEntity} from '../../../common/entities';

export class Discount extends BaseEntity {
     description: string;
     relativeDiscount: number;
     absolutDiscount: number;
}
