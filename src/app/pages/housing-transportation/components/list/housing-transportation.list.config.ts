import { Injectable, Inject, Injector } from '@angular/core';
import {IComponentConfig, IDataService} from '../../../../common/interfaces';
import {HousingtranportationService} from '../../../../core/data';
import {HousingTransportation} from '../../../../core/model/housing-transportation';


@Injectable()
export class HousingTransportationListConfig implements IComponentConfig<HousingTransportation> {
    componentTitle = 'Housing Transportation';
    cls: new() => any = HousingTransportation;
    includes = 'ClassParticipant.AppUser,HousingOption,Transportation';
    selectJSONPath = 'id;classParticipant.appUserId;isBooked;endDate;startDate;transportation.description;housingOption.*;classParticipant.appUser.firstName;classParticipant.appUser.lastName';
    constructor(
        @Inject(HousingtranportationService) public dataSvc: IDataService<HousingTransportation>,
        public injector: Injector,
    ) { }
}
