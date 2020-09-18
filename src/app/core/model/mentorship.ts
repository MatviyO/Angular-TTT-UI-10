import { Profile } from './';
import { Feedback } from './properties';
import {BaseEntity} from '../../common/entities';


export class Mentorship extends BaseEntity {
    applicationId: number;
    application?: Profile;
    mentorCompanyId: number;
    mentorName: string;
    wantsMentor: boolean;

    feedbacks?: MentorFeedback[];

    constructor () {
        super();
        this.feedbacks = new Array<MentorFeedback>();
    }

}

export class MentorFeedback extends BaseEntity {
    dateTime: Date;
    feedback?: Feedback;
    feedbackId: number;
    notes: string;
    companyAlternateLocationId: number;

}
