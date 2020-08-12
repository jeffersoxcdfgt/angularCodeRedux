import {Injectable} from '@angular/core';
//import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as teamActions from './teams.actions';
//import {Observable} from 'rxjs/Observable';
import { Observable, of } from 'rxjs';
import {Action} from '@ngrx/store';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/map';
import { catchError, map, mergeMap } from 'rxjs/operators';
//import 'rxjs/add/operator/catch';
import {
  AddTeam, AddTeamError, AddTeamSuccess,
  GetAllTeams ,GetAllTeamsError, GetAllTeamsSuccess,
  GetTeam, GetTeamError, GetTeamSuccess,
  RemoveTeam, RemoveTeamError, RemoveTeamSuccess,
  UpdateTeam, UpdateTeamError, UpdateTeamSuccess
} from './teams.actions';
import {TeamsService} from '../shared/teams.service';
import {Team} from '../shared/team';

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions,
              private svc: TeamsService) {
  }

    @Effect()
    public getAllTeams$: Observable<Action> = this.actions$.pipe(
      ofType<GetAllTeams>(teamActions.GET_TEAMS),
      mergeMap((action: GetAllTeams) =>
        this.svc.findAll().pipe(
          map((teams: Team[]) => new GetAllTeamsSuccess(teams)),
          catchError(err => of(new GetAllTeamsError(err)))
        )
      )
    );


  @Effect()
  getTeam$: Observable<Action> = this.actions$.pipe(
      ofType<GetTeam>(teamActions.GET_TEAM),
      mergeMap((action: GetTeam) =>
        this.svc.findById(action.payload).pipe(
          map((team: Team) => new GetTeamSuccess(team)),
          catchError(err => of(new GetTeamError(err)))
        )
      )
    );


    @Effect()
    public updateTeam$: Observable<Action> = this.actions$.pipe(
      ofType<UpdateTeam>(teamActions.UPDATE_TEAM),
      mergeMap((action: UpdateTeam) =>
        this.svc.update(action.payload).pipe(
          map((team: Team) => new UpdateTeamSuccess()),
          catchError(err => of(new UpdateTeamError(err)))
        )
      )
    );


    @Effect()
    public createTeam$: Observable<Action> = this.actions$.pipe(
      ofType<AddTeam>(teamActions.CREATE_TEAM),
      mergeMap((action: AddTeam) =>
        this.svc.insert(action.payload).pipe(
          map((team: Team) => new AddTeamSuccess(team.id)),
          catchError(err => of(new AddTeamError(err)))
        )
      )
  );

    @Effect()
    public removeTeam$: Observable<Action> = this.actions$.pipe(
      ofType<RemoveTeam>(teamActions.DELETE_TEAM),
      mergeMap((action: RemoveTeam) =>
        this.svc.delete(action.payload).pipe(
          map((team: Team) => new RemoveTeamSuccess(team)),
          catchError(err => of(new RemoveTeamError(err)))
        )
      )
    );
}
