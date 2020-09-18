import { Injectable, Injector } from '@angular/core';

import { HousingTransportation, HouseTransportationOptions, Transportation } from '../model/housing-transportation';
import {BaseDataService, ResourceServiceBase} from '../../common/services';

@Injectable()
export class HousingtranportationService extends BaseDataService<HousingTransportation> {
    constructor(injector: Injector) {
        super(injector, 'api/housing');
    }
}

@Injectable()
export class HousingtranportationOptionsService extends ResourceServiceBase<HouseTransportationOptions> {
    constructor(injector: Injector) {
        super(injector, 'api/housingOptions');
    }
}

@Injectable()
export class TransportationService extends ResourceServiceBase<Transportation> {
    constructor(injector: Injector) {
        super(injector, 'api/HousingTransportations');
    }
}
