import {Action} from '@ngrx/store';
//import {Observable} from 'rxjs/Observable';
import { Observable, of } from 'rxjs';
//import {Subject} from 'rxjs/Subject';
import {Subject} from 'rxjs';
//import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {BehaviorSubject} from 'rxjs';
//import {map} from 'rxjs/operator/map';
import { catchError, map, mergeMap } from 'rxjs/operators';

export class MockStore<T> extends BehaviorSubject<T> {
  constructor(private _initialState: T) {
    super(_initialState);
  }

  dispatch = (action: Action): void => {
  }

  // tslint:disable-next-line:no-shadowed-variable
  select = <T, R>(pathOrMapFn: any, ...paths: string[]): Observable<R> => {
    return map.call(this, pathOrMapFn);
  }
}
