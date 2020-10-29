import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Trigger} from '../model';
import {Observable} from 'rxjs/Observable';
import {catchError, map, publishReplay, refCount} from 'rxjs/operators';
import {ITriggerHelper, ITriggerService} from '../../common/interfaces';

@Injectable()
export class TriggerService implements ITriggerService {

  url: string;
  triggers: Observable<Trigger[]>;

  constructor(protected http: HttpClient) {
  }

  queryByCategory(category: string, filter: string): Observable<Trigger[]> {
    let url = 'api/Triggers/category?';

    if (category === 'All' && !filter) {
      return this.queryAll('api/Triggers/category?cats=1&cats=2&cats=3&cats=4&cats=5&cats=6&cats=7&cats=8');
    }

    if (category) {
      url += `cats=${category}`;
    }

    if (filter) {
      url += `&where=${filter}`;
    }

    return this.query(`${url}`)
      .pipe(catchError(this.handleError));
  }

  queryByType(type: string, filter: string): Observable<Trigger[]> {
    let url = 'api/Triggers/type?';

    if (type) {
      url += `types=${type}`;
    }

    if (filter) {
      url += `&where=${filter}`;
    }
    return this.query(`${url}`)
      .pipe(catchError(this.handleError));
  }

  invalidate(): void {
    this.triggers = null;
  }

  private queryAll(url: string): Observable<Trigger[]> {
    if (!this.triggers) {
      this.triggers = this.query(url);

      setTimeout(() => {
        this.triggers = null;
      }, 30000);
    }

    return this.triggers;
  }

  private query(url: string): Observable<Trigger[]> {
    return this.http.get<Trigger[]>(`${url}`)
      .pipe(publishReplay(1))
      .pipe(refCount())
      .pipe(map(x => x.filter(t => +t.data.type === 3)));
  }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}

@Injectable()
export class TriggerHelper implements ITriggerHelper {

  categories: any[] = [
    {id: 0, title: 'All category', url: ''},
    {id: 1, title: 'Profile', url: 'profile/details/'},
    {id: 2, title: 'Tools', url: 'tools/details/'},
    {id: 3, title: 'Graduation', url: 'classes/details/'},
    {id: 4, title: 'Ride Along', url: 'ride-along/details/'},
    {id: 5, title: 'Interview', url: 'interviews/details/appl/'},
    {id: 6, title: 'Hiller', url: ''},
    {id: 7, title: 'Employment', url: 'job-tracking/details/appl/'},
    {id: 8, title: 'Housing', url: 'housing-transportation/details/'},

    // For Total Tech__________
    {id: 9, title: 'Transcript Order', url: ''},
    {id: 10, title: 'Registration Pack', url: ''},
  ];

  types: any[] = [
    {id: 0, title: 'Application registration not completed'},
    {id: 1, title: 'Tools invoice not sent'},
    {id: 2, title: 'Tools not ordered'},
    {id: 3, title: 'Tools check not received'},
    {id: 4, title: 'Tools check not sent'},
    {id: 5, title: 'Tools already needed, but not yet received'},
    {id: 6, title: 'Graduation invitation not sent'},
    {id: 7, title: 'Class starts, but application is not completed'},
    {id: 8, title: 'Ride Along feedback not provided'},
    {id: 9, title: 'Interview outcome not provided'},
    {id: 10, title: 'Hiller bonus'},
    {id: 11, title: 'No Employment after completed classes'},
    {id: 12, title: 'No booked housing'},

    // For Total Tech__________
    {id: 13, title: 'Transcript form not ordered'},
    {id: 14, title: 'Transcript form not received'},
    {id: 15, title: 'Registration Pack signed'},
    {id: 16, title: 'Registration Pack assessment test needed'},
  ];

  getTriggerCat(catId: number): any {
    return this.categories.find(x => x.id === catId);
  }

  getTriggerType(typeId: number): string {
    return this.types.find(x => x.id === typeId).title;
  }

  getDays(days: number, isApproaching: boolean): string {
    if (isApproaching) {
      if (days < 0) {
        return `${+days.toFixed(0) * -1} days left`;
      }
      return `overdue for ${days.toFixed(0)} days`;
    }
    return `for ${days.toFixed(0)} days`;
  }
}
