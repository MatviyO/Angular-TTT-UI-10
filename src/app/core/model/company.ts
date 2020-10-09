import { Discount } from './properties/discount';
import {BaseAddressUnDeletable, BaseEntity} from '../../common/entities';
import {AlternativeLocation, CompanyAffiliate, CompanyContacts} from './properties';

export class Company extends BaseAddressUnDeletable {
    name: string;
    trades: CompanyTrade[];
    affiliate: CompanyAffiliate;
    affiliateId: number;
    alternateLocations: AlternativeLocation[];
    baseCloseBy: string;
    baseCloseById: number;
    contacts: CompanyContacts[];
    isProspect: boolean;
    webSite: string;
    notes: string;
    otherTrades: string;
    defaultDiscountId: number;
    defaultDiscount: Discount;
    constructor() {
        super();
        this.trades = [];
        this.alternateLocations = [];
    }
}

export class CompanyTrade extends BaseEntity {
    companyId: number;
    trade: number;
    disable?: boolean;
    editing?: boolean;
    name?: string;

    constructor(trade: number) {
        super();
        this.trade = trade;
    }
}
