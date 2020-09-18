import {BaseEntityUnDeletable} from '../../../common/entities';
import {Profile} from '../profile';

export class LogItem extends BaseEntityUnDeletable {
     createdById: number;
     createdBy: Profile;
     subjectId: number;
     subject: Profile;
     itemId: number;
     subItemId: number;
     category: LogCategory;
     type: LogType;
     isUserProvided: boolean;
     data: any;
     userData: string;
}


export enum LogType {
     classReservationAdded = 1001,
     classReservationRemoved = 1002,
     classReservationPromoted = 1003,
     classParticipantMovedFromClass = 1004,
     classParticipantMovedToClass = 1005,
     classAttendeeWithdrawn = 1006,
     classAttendeeRemoved = 1007,
}

export enum LogTypeSpaceName {
     'Added' = 1001,
     'Removed reservation' = 1002,
     'Promoted' = 1003,
     'Moved from class' = 1004,
     'Moved to class' = 1005,
     'Withdrawn' = 1006,
     'Removed attendee' = 1007,
}


export enum LogCategory {
     class = 1,
}
