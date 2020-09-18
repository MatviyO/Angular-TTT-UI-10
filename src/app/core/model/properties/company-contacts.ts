import {BaseEntityUnDeletable} from '../../../common/entities';

export class CompanyContacts extends BaseEntityUnDeletable {
    companyId: number;
    firstName: string;
    lastName: string;
    title: string;
    phone: string;
    email: string;
    note: string;
}
