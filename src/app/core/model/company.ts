
import { Discount } from './properties/discount';
import {AlternativeLocation, CompanyAffiliate, CompanyContacts} from './properties';
import {BaseAddressUnDeletable, BaseEntity} from '../../common/entities';


export class Company extends BaseAddressUnDeletable {
  name: string;
  // trades: CompanyTrade[];
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
  companyTradeId?: number;

  constructor() {
    super();
    this.trades = [];
    this.alternateLocations = [];
  }
}

export class CompanyTrade extends BaseEntity {
  companyId: number;
  company: Company;
  trade: number;
  isActive: boolean;
  disable?: boolean;
  editing?: boolean;
  name?: string;

  constructor(trade: number = null) {
    super();
    this.trade = trade;
    this.isActive = true;
  }
}
