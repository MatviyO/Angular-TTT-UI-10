import { IEntity } from '../interfaces';
import {Profile} from '../../core/model';



export class BaseEntity implements IEntity {
  id: number;
  rowVersion: string;
  created: Date;
  hasTrigger?: boolean;
  modified: Date;
}

export class BaseEntityUnDeletable extends BaseEntity {
  isActive: boolean;

  constructor() {
    super();
    this.isActive = true;
  }
}

export class BaseAddressUnDeletable extends BaseEntityUnDeletable {
  country: string;
  state: string;
  city: string;
  address: string;
  zip: number;
}

export class BaseEntityWithApplRef extends BaseEntity {
  applicationId: number;
  application: Profile;
}

export class BaseEntityWithAppUserRef extends BaseEntity {
  appUserId: number;
  appUser: Profile;
}

