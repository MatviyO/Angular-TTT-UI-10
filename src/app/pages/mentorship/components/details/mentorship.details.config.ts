import { Injectable, Inject, Injector } from '@angular/core';
import {IDataService, IEditorStatefulConfig} from '../../../../common/interfaces';
import {MentorshipService} from '../../../../core/data';
import {Mentorship} from '../../../../core/model';



@Injectable()
export class MentorshipDetailsConfig implements IEditorStatefulConfig<Mentorship> {
    navigationTitle = 'Mentorship';
    navigationUrlPrefix = 'mentorship';
    cls: new () => any = Mentorship;
    componentTitle = 'Mentorship';
    includes = 'Application,Feedbacks.Company.AlternateLocations';

    constructor(
        @Inject(MentorshipService) public dataSvc: IDataService<Mentorship>,
        public injector: Injector,
    ) { }
}
