import { Injectable, Inject, Injector } from '@angular/core';

import { IEditorStatefulWithTriggersConfig, ITriggerService, IDataService, ITriggerHelper } from '@ttt/common/interfaces';

import { Profile, ProfileService, TriggerService, TriggerHelper } from '@ttt/core';

@Injectable()
export class ProfileDetailsConfig implements IEditorStatefulWithTriggersConfig<Profile> {
    navigationTitle: string = 'Profile';
    navigationUrlPrefix: string = 'profile';
    cls: { new (): Profile } = Profile;
    triggerCategory: string = 'Application';
    componentTitle = 'Profile';

    constructor(
        @Inject(ProfileService) public dataSvc: IDataService<Profile>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,        
        public injector: Injector,
    ) { }
}
