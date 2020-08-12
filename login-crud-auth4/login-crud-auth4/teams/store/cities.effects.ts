import {Injectable} from '@angular/core';
//import {Actions, Effect} from '@ngrx/effects';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as cityActions from './cities.actions';
//import {Observable} from 'rxjs/Observable';
import {Observable , of} from 'rxjs';

import {Action} from '@ngrx/store';
//import 'rxjs/add/operator/switchMap';

//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {City} from '../shared/city';

import {GetAllCitiesError, GetAllCitiesSuccess , GetAllCities} from './cities.actions';
import {CitiesService} from '../shared/cities.service';

@Injectable()
export class CityEffects {
  constructor(private actions$: Actions, private svc: CitiesService) {}


  @Effect()
     getAllCities$: Observable<Action> = this.actions$.pipe(
      ofType<GetAllCities>(cityActions.GET_CITIES),
      mergeMap((action: GetAllCities) =>
        this.svc.findAll().pipe(
          map((result: City[]) => new GetAllCitiesSuccess(result)),
          catchError(err => of(new GetAllCitiesError(err)))
        )
      )
    );

}
