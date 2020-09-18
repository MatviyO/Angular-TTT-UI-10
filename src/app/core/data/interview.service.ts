import { Injectable, Injector } from '@angular/core';

import { Interview } from '../model';
import {BaseDataService} from '../../common/services';


@Injectable()
export class InterviewService extends BaseDataService<Interview> {
    constructor(injector: Injector) {
        super(injector, 'api/EmploymentCompanies', 'interviewStages.any()');
    }

    // query(filter: string = '', order: string = '', take: number = 20, skip: number = 0, args: any[] = []):
    //     Promise<BaseEntityCollection<Interview>> {
    //         return super.query(filter, order, take, skip, args)
    //             .then(res => {
    //                 return {
    //                     total: res.total,
    //                     data: res.data.map(x => {
    //                         return {
    //                             application: x.employmentHistory ? x.employmentHistory.application : null,
    //                             applicationId: x.employmentHistory ? x.employmentHistory.applicationId : null,
    //                             company: x.company,
    //                             companyId: x.companyId,
    //                             employment: x.employmentHistory,
    //                             employmentId: x.employmentId,
    //                             stages: x.stages,
    //                             trade: x.trade,
    //                             id: -1,
    //                             isHired: x.isHired,
    //                             created: x.created,
    //                             outcomeId: x.
    //                         } as Interview;
    //                     })
    //                 }
    //             })
    //     }
}
