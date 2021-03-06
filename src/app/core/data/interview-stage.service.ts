import { Injectable } from '@angular/core';
import { InterviewStageV2, InterviewStatusDto } from '../model';


@Injectable()
export class InterviewStatusHelper {
  get(interviewStages: InterviewStageV2[]): InterviewStatusDto {
    const s = new InterviewStatusDto();

    if (interviewStages.length > 0) {
      const date = new Date();
      const futureStages = interviewStages.filter(x => new Date(x.date) >= date).map(x => x.date);
      const passedStages = interviewStages.filter(x => new Date(x.date) < date).map(x => x.date);
      if (futureStages.length > 0) {
        if (passedStages.length === 0) {
          const minFutureStages = new Date(futureStages.reduce((a, b) => a < b ? a : b));
          s.status = 'pending';
          s.date = minFutureStages;
          s.statusFormatted = `pending, next stage on ${minFutureStages.toLocaleDateString()}`;
          return s;
        }
        const minFutureStages = new Date(futureStages.reduce((a, b) => a < b ? a : b));
        s.status = 'in process';
        s.date = minFutureStages;
        s.statusFormatted = `in process, next stage on ${minFutureStages.toLocaleDateString()}`;
        return s;
      } else {
        const maxPassedStages = new Date(passedStages.reduce((a, b) => a > b ? a : b));
        s.status = 'waiting for outcome';
        s.date = maxPassedStages;
        s.statusFormatted = `waiting for outcome, last stage ${maxPassedStages.toLocaleDateString()}`;
        return s;
      }
    }
    return s;
  }
}
