
import { Profile } from './';
import {BaseEntity} from '../../common/entities';

export class Tools extends BaseEntity {
  applicationId: number;
  application?: Profile;
  locationId: number;
  poReceived: Date;
  invoiceSent: Date;
  toolsOrdered: Date;
  checkReceived: Date;
  checkSent: Date;
  toolsReceived: Date;
  processTerminated: Date;
  poNumber: string;
  invoiceNumber: string;
  checkNumber: string;
  toolsNeeded: boolean;
  toolsNeededBy: Date;
  toolsAssigned: boolean;
  hasTrigger?: boolean = false;

  lastDateSetValue: Date;
  lastDateSet: string;
}
