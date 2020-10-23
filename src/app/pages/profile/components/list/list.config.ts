import { Injectable, Inject, Injector } from '@angular/core';

import { IListWithTriggersConfig, ITriggerService, IDataService } from '@ttt/common/interfaces';

import { Profile, ProfileService, TriggerService } from '@ttt/core';

@Injectable()
export class ProfilesListConfig implements IListWithTriggersConfig<Profile> {
    triggerType: string = 'Application';
    cls: { new(): any } = Profile;
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
