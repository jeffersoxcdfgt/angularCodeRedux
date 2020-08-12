import {Injectable} from '@angular/core';
//import {Actions, Effect} from '@ngrx/effects';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as platformActions from './platforms.actions';
//import {Observable} from 'rxjs/Observable';
import {Observable , of} from 'rxjs';

import {Action} from '@ngrx/store';
//import 'rxjs/add/operator/switchMap';

//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {Platform} from '../shared/platform';

import {GetAllPlatformsError, GetAllPlatformsSuccess , GetAllPlatforms} from './platforms.actions';
import {PlatformsService} from '../shared/platforms.service';

@Injectable()
export class PlatformEffects {
  constructor(private actions$: Actions, private svc: PlatformsService) {}

  /*@Effect()
  getAllPlatforms$: Observable < Action > = this
    .actions$
    .ofType(platformActions.GET_PLATFORMS)
    .switchMap(() => this.svc.findAll())
    .map(result => new GetAllPlatformsSuccess(result))
    .catch((err) => [new GetAllPlatformsError(err)]);*/

  @Effect()
     getAllPlatforms$: Observable<Action> = this.actions$.pipe(
      ofType<GetAllPlatforms>(platformActions.GET_PLATFORMS),
      mergeMap((action: GetAllPlatforms) =>
        this.svc.findAll().pipe(
          map((result: Platform[]) => new GetAllPlatformsSuccess(result)),
          catchError(err => of(new GetAllPlatformsError(err)))
        )
      )
    );

}
