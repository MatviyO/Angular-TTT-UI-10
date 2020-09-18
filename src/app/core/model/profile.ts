
import { ProgramExit } from './properties';
import { RegistrationEventApplication } from './registration-event';
import { OrientationEventApplication } from './orientation-event';
import { Affiliation } from './properties/application-affiliation';
import {BaseEntity, BaseEntityUnDeletable} from '../../common/entities';


export class AppUser extends BaseEntityUnDeletable {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    email: string;
    role: UserRole;
    customData: {
        signature: string;
    };
    type: ApplicationType;
}

export enum UserRole {
    Basic = 0,
    Student = 10,
    Instructor = 20,
    Admin = 100,
}

export enum ApplicationType {
    None,
    Civilian,
    Veteran,
    Military,
}

export class Profile extends AppUser {
    age: number;
    dateOfBirth: Date;
    rank: string;
    phone: string;
    notes: string;
    unit: string;
    applicationDate: Date;
    startWorkDate: Date;
    terminalDate: Date;
    last4OfSSN: number;
    ssn: string;
    ptdy: boolean;

    race: string;
    gender: string;
    middleName: string;

    address: string;
    country: string;
    city: string;
    state: string;
    zip: string;
    militaryBranchId: number;

    etsDate: Date;
    militaryStatus: string;
    homeBaseId: number;
    homeBase: string;
    homeBaseCity: string;
    homeBaseState: string;
    // isActive: boolean;
    hearAboutProgramDescription: string;
    hearAboutProgramId: string;
    registrationComplete: boolean;
    registrationCompletionDate: Date;
    linkedInProfile: string;
    hillerBonusPaidDate: Date;
    communicationHistory: CommunicationHistory[];
    facebookProfile: string;
    interviewDate: Date;
    hasPhoto: boolean;

    disclosureFormAccepted: boolean;

    // tslint:disable-next-line:variable-name
    asvaB_ADMIN: number;
    // tslint:disable-next-line:variable-name
    asvaB_CMBT: number;
    // tslint:disable-next-line:variable-name
    asvaB_COMMO: number;
    // tslint:disable-next-line:variable-name
    asvaB_ELEC: number;
    // tslint:disable-next-line:variable-name
    asvaB_FA: number;
    // tslint:disable-next-line:variable-name
    asvaB_FOOD: number;
    // tslint:disable-next-line:variable-name
    asvaB_GT: number;
    // tslint:disable-next-line:variable-name
    asvaB_MAINT: number;
    // tslint:disable-next-line:variable-name
    asvaB_MECH: number;
    // tslint:disable-next-line:variable-name
    asvaB_TECH: number;

    toolsAssigned: string;
    toolsNeeded: boolean;
    toolsNeededBy: string;

    preferredLocations: Location[];
    programExits: ProgramExit[];
    programsAdmittedTo: ApplicationProgram[];

    registrationEvent: RegistrationEventApplication;
    orientationEvent: OrientationEventApplication;


    affiliations: Affiliation[];

    properties?: Properties;
    id: number;

    constructor() {
        super();
        this.country = 'US';
        this.preferredLocations = new Array<Location>();
        this.programExits = new Array<ProgramExit>();
        this.programsAdmittedTo = new Array<ApplicationProgram>();
        this.communicationHistory = new Array<CommunicationHistory>();
    }
}

export class CommunicationHistory extends BaseEntity {
    applicationId: number;
    timeStamp: Date;
    note: string;
}

export class ApplicationProgram {
    id: number;
    applicationId: number;
    programType: number;

    constructor(appId: number, type: number) {
        this.applicationId = appId;
        this.programType = type;
    }
}

export class Properties {
    // tslint:disable-next-line:variable-name
    ApplicationId: number;
    // tslint:disable-next-line:variable-name
    HillerEmploymentId: number;
    // tslint:disable-next-line:variable-name
    CanHillerHousingAllowance: boolean;
}

export class Location {
    id: number;
    applicationId: number;
    priority: number;
    city: string;
    country: string;
    state: string;

}
