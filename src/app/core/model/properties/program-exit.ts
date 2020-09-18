
import { ExitReason } from './exit-reason';
import {BaseEntity} from '../../../common/entities';

export class ProgramExit extends BaseEntity {
    applicationId: number;
    exitDate: Date;
    exitNote: string;
    exitReasonId: number;
    exitReason: ExitReason;
    // exitReasonDescription: string;

    constructor() {
        super();
        this.exitDate = new Date();
    }
}
