import { Injectable, Inject, Injector } from '@angular/core';
import {IDataService, IListWithTriggersConfig, ITriggerService} from '../../../../common/interfaces';
import {ProfileService, TriggerService} from '../../../../core/data';
import {Profile} from '../../../../core/model';


@Injectable()
export class ProfilesListConfig implements IListWithTriggersConfig<Profile> {
    triggerType = 'Application';
    cls: new() => any = Profile;
    componentTitle = 'Profile';
    includes = 'ProgramsAdmittedTo,RegistrationEvent,OrientationEvent';
    // tslint:disable-next-line:max-line-length
    selectJSONPath = 'id;registrationCompletionDate;hasPhoto;firstName;lastName;email;phone;isActive;programsAdmittedTo[*].programType;properties.HillerEmploymentId;properties.CanHillerHousingAllowance;registrationEvent.eventId;orientationEvent.eventId';

    constructor(
        @Inject(ProfileService) public dataSvc: IDataService<Profile>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        public injector: Injector,
    ) { }
}
