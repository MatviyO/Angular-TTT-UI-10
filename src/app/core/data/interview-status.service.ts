import { Trade } from '../model/properties';

export class InterviewStatusService {
    getInterviewStatus(): Trade[] {
        return [
            { id: 1, name: 'Pending' },
            { id: 2, name: 'In interview process' },
            { id: 3, name: 'Hired' },
            { id: 4, name: 'Not hired' },
            { id: 5, name: 'Declined offer' },
            { id: 6, name: 'Failed screeing' },
            { id: 7, name: 'Canceled by candidate' },
            { id: 8, name: 'Canceled by company' },
        ];
    }
    getInterviewStatusbyId(id: number): string {
        const t = this.getInterviewStatus().find(x => x.id === id);
        if (t) {
            return t.name;
        }
        return '';
    }
}
