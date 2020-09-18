import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any;
};

@Injectable()
export class AppState {
  // tslint:disable-next-line:variable-name
  _state: InternalStateType = {};

  constructor() {
  }

  // already return a clone of the current state
  // tslint:disable-next-line:typedef
  get state() {
    return this._state = this._clone(this._state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  // tslint:disable-next-line:typedef
  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  // tslint:disable-next-line:typedef
  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  // tslint:disable-next-line:typedef
  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
