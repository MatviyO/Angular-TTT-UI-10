import { Observable } from 'rxjs/Observable';
import { Trigger } from '../../core';

export interface ITriggerService {
  queryByCategory(category: string, filter: string): Observable<Trigger[]>;
  queryByType(type: string, filter: string): Observable<Trigger[]>;
}

export interface ITriggerHelper {
  getTriggerType(typeId: number): string;
  getDays(days: number, isApproaching: boolean): string;
}
