import { Injectable, Inject, Injector } from '@angular/core';
import {MentorshipService} from '../../../../core/data';
import {IComponentConfig, IDataService} from '../../../../common/interfaces';
import {Mentorship} from '../../../../core/model';



@Injectable()
export class MentorshipListConfig implements IComponentConfig<Mentorship> {
    componentTitle = 'Mentorship';
    includes = 'Application,Feedbacks';
    selectJSONPath = 'id;application.firstName;application.lastName;application.isActive;feedbacks[*]';

    constructor(
        @Inject(MentorshipService) public dataSvc: IDataService<Mentorship>,
        public injector: Injector,
    ) { }
}
