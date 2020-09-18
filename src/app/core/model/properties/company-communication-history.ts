import {BaseEntityUnDeletable} from '../../../common/entities';
import {CallReason} from './call-reason';
import {CompanyContacts} from './company-contacts';
import {Profile} from '../profile';

export class CompanyCommunicationHistory extends BaseEntityUnDeletable {
    firsName: string;
    lastName: string;
    notes: string;

    companyId: number;
    applicationId: number;
    companyContactId: number;
    companyCallReasonId: number;

    application?: Profile;
    contact?: CompanyContacts;
    callReason?: CallReason;

    timeStamp: Date;
}
