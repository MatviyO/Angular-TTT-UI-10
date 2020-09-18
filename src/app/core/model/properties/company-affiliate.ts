import {BaseEntityUnDeletable} from '../../../common/entities';
import {Discount} from './discount';

export class CompanyAffiliate extends BaseEntityUnDeletable {
    description: string;
    defaultDiscountId: number;
    defaultDiscount: Discount;

}
