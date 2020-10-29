import { Injectable, Injector } from '@angular/core';
import {BaseDataServiceUnDeletable} from '../../../common/services';
import {Rank} from '../../../core/model/properties';


@Injectable()
export class RankService extends BaseDataServiceUnDeletable<Rank> {

    constructor(injector: Injector) {
        super(injector, 'api/ApplicationMilitaryRanks');
    }
}
