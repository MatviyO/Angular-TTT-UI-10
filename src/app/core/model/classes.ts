
import { Profile, Location, Graduation, ApplicationType, AppUser, Campus } from './';
import {BaseEntity, BaseEntityUnDeletable, BaseEntityWithApplRef, BaseEntityWithAppUserRef} from '../../common/entities';

export class StudentGraduation extends BaseEntityWithApplRef {
    graduationExpectedDateId: number;
    graduationExpectedDate?: Graduation;
    isAttendingGraduation: boolean;
    graduationInvitationSentDate: Date;
    graduationNotes: string;
    graduationLocationId: number;
    graduationLocation?: Location;
    hasTrigger = false;
}
export enum SchedulingType {
    'AM',
    'PM1',
    'PM2',
}
// _______________________classes______________________
export class ScheduledClass extends BaseEntityUnDeletable {
    campus: Campus;
    campusId: number;

    totalCapacity: number;
    totalSpotsLeft: number;
    militaryCapacity: number;
    militarySpotsLeft: number;

    programId: number;
    program: Program;

    notes: string;
    timeNotes: string;

    startDate?: Date;
    endDate?: Date;

    colorCode: string;
    courseId: number;

    // duration: any;
    grades: Grade[];
    // occursOnWeekend: boolean;
    // trade: number;
    // name: string;

    // isPmClass: boolean;
    schedulingType: SchedulingType;

    instructors: Instructor[];
    attendees: Attendee[];
    reservations: Reservation[];
    days: ClassDay[];

    constructor() {
        super();
        this.instructors = [];
        this.attendees = [];
        this.reservations = [];
        this.days = [];
        this.program = new Program();
        this.schedulingType = SchedulingType.AM;
    }
}

export class ClassDay extends BaseEntity {
    classId?: number;
    date: any;
    assignments: ClassDayAssignment[];

    constructor() {
        super();
        this.assignments = [];
    }
}

export class ClassDayAssignment extends BaseEntity {
    classDayId: number;
    assignmentId: number;
    assignment: ProgramAssignment;
    grades: Grade[];
}

export class Grade extends BaseEntity {
    application: Profile;
    applicationId: number;
    assignment: ProgramAssignment;
    assignmentId: number;
    instructorId: number;
    comment: string;
    grade: string;
    scheduledClassId: number;
    attendeeId: number;
    attendee: Attendee;
}

export class Attendee extends BaseEntityWithAppUserRef {
    classId: number;
    classPayments: Payment[];
    notes: string;
    graduationLevelId: number;
    graduationLevel: string;
    techLevel: string;
    withdrawnDate: Date | string;
    classWithdrawnReason: WithdrawReason;

    classWithdrawnNote: string;  // no include by backend

    classWithdrawnReasonId: number;
}

export class Instructor extends BaseEntityUnDeletable {
    userId: any;
    applicationId: number;
    application: Profile;
    instructorId: number;
    instructor: AppUser;
}

export class WithdrawReason extends BaseEntityUnDeletable {
    description: string;
    slsdCode: string;
}

export class Reservation extends BaseEntity {
    appUser: Profile;
    appUserId: number;
    class: ScheduledClass;
    classId: number;
    notes: string;
    isCampbellStrong: boolean;
    // classPayment: Payment;
    // type: ApplicationType;
}

export class Payment extends BaseEntity {
    classReservationId: number;
    paidAmount: number;
    paymentMethod: string;
    checkNumber: string;
    paymentDate: Date;
}


// ____________________program____________________
export class Program extends BaseEntityUnDeletable {
    clockHours: number;
    description: string;
    defaultSchedule: ProgramDay[];
    isDefaultScheduleCompleted: boolean;
    programLength: number;

    slsdProgramCode: string;
    slsdProgramLength: string;
    slsdProgramName: string;
    slsdcipCode: string;

    sections: ProgramSection[];
    graduationLevels: GraduationLevel[];
    trade: number;
    isEditable: boolean;
    courseId: number;

    name?: string;

    constructor() {
        super();
        this.sections = [];
        this.graduationLevels = [];
        this.defaultSchedule = [];
        this.isEditable = true;
        this.isActive = false;
    }
}

export class GraduationLevel extends BaseEntity {
    levelName: string;
    minScore: number;
    programInformationId: number;
}

export class ProgramDay extends BaseEntity {
    programId: number;
    program: Program;
    index: number;
    dayAssignments: ProgramDayAssignment[];

    constructor() {
        super();
        this.dayAssignments = [];
    }
}

export class ProgramDayAssignment extends BaseEntity {
    programDayId: number;
    day: ProgramDay;
    assignmentId: number;
    assignment: ProgramAssignment;
}

export class ProgramSection extends BaseEntity {
    assignments: ProgramAssignment[];
    programInformationId: number;
    description: string;

    constructor() {
        super();
        this.assignments = [];
    }
}

export class ProgramAssignment extends BaseEntity {
    category: ProgramAssignmentCategory;
    categoryId: number;
    grade: Grade[];
    maxGrade: number;
    weigh = 0;
    programSectionId: number;

    constructor() {
        super();
    }
}

export class ProgramAssignmentCategory extends BaseEntity {
    name: string;
    isActive: boolean;
}
