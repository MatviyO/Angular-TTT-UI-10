import { Injectable, Inject, Injector } from '@angular/core';
import {IComponentConfig, IDataService} from '../../../common/interfaces';
import {EmploymentReport} from '../../../core/model/reports';
import {InterviewReportService} from '../../../core/data';



@Injectable()
export class InterviewReportConfig implements IComponentConfig<EmploymentReport> {
    componentTitle = 'Interview report';

    constructor(
        @Inject(InterviewReportService) public dataSvc: IDataService<EmploymentReport>,
        public injector: Injector,
    ) { }
}
