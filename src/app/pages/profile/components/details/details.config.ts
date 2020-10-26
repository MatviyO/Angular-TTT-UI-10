import { Injectable, Inject, Injector } from '@angular/core';
import {ProfileService, TriggerHelper, TriggerService} from '../../../../core/data';
import {IDataService, IEditorStatefulWithTriggersConfig, ITriggerHelper, ITriggerService} from '../../../../common/interfaces';
import {Profile} from '../../../../core/model';

@Injectable()
export class ProfileDetailsConfig implements IEditorStatefulWithTriggersConfig<Profile> {
    navigationTitle = 'Profile';
    navigationUrlPrefix = 'profile';
    cls: new () => Profile = Profile;
    triggerCategory = 'Application';
    componentTitle = 'Profile';

    constructor(
        @Inject(ProfileService) public dataSvc: IDataService<Profile>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        @Inject(TriggerHelper) public triggerHelper: ITriggerHelper,
        public injector: Injector,
    ) { }
}
