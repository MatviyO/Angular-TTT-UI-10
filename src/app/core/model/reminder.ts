import { BaseEntity } from 'src/app/common';
import { AppUser } from './profile';


export enum CallerSite {
    Unknown,
    TTT,
    SchoolPortal,
}

export class Reminder extends BaseEntity {
    activeAfterUtc: Date;
    headerText: string;
    text: string;
    category: string;
    siteUrl: string;
    isDismissed: boolean;
    relatedAppUserId: number;
    relatedAppUser?: AppUser;
    data: any;

    time?: any;
    sendEmail: boolean;
    site?: CallerSite;

    constructor() {
        super();
        this.activeAfterUtc = new Date(new Date().getUTCDate());
    }
}
