import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalState {

  // tslint:disable-next-line:ban-types variable-name
  private _data = new Subject<Object>();
  // tslint:disable-next-line:variable-name
  private _dataStream$ = this._data.asObservable();

  // tslint:disable-next-line:ban-types variable-name
  private _subscriptions: Map<string, Function[]> = new Map<string, Function[]>();

  constructor() {
    this._dataStream$.subscribe((data) => {
      this._onEvent(data);
    });
  }

  // tslint:disable-next-line:typedef
  notifyDataChanged(event, value) {

    const current = this._data[event];
    if (current !== value) {
      this._data[event] = value;
      this._data.next({
        event,
        data: this._data[event],
      });
    }
  }

  // tslint:disable-next-line:typedef ban-types
  subscribe(event: string, callback: Function) {
    const subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);
  }

  // tslint:disable-next-line:typedef
  _onEvent(data: any) {
    const subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
