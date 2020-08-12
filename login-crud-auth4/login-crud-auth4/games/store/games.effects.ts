import {Injectable} from '@angular/core';
//import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as gameActions from './games.actions';
//import {Observable} from 'rxjs/Observable';
import { Observable, of } from 'rxjs';
import {Action} from '@ngrx/store';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/map';
import { catchError, map, mergeMap } from 'rxjs/operators';
//import 'rxjs/add/operator/catch';
import {
  AddGame, AddGameError, AddGameSuccess,
  GetAllGames ,GetAllGamesError, GetAllGamesSuccess,
  GetGame, GetGameError, GetGameSuccess,
  RemoveGame, RemoveGameError, RemoveGameSuccess,
  UpdateGame, UpdateGameError, UpdateGameSuccess
} from './games.actions';
import {GamesService} from '../shared/games.service';
import {Game} from '../shared/game';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions,
              private svc: GamesService) {
  }

  /*@Effect()
  getAllGames$: Observable<Action> = this.actions$
    .ofType(gameActions.GET_GAMES)
    .switchMap(() => this.svc.findAll())
    .map(heroes => new GetAllGamesSuccess(heroes))
    .catch((err) => [new GetAllGamesError(err)]);*/

    @Effect()
    public getAllGames$: Observable<Action> = this.actions$.pipe(
      ofType<GetAllGames>(gameActions.GET_GAMES),
      mergeMap((action: GetAllGames) =>
        this.svc.findAll().pipe(
          map((games: Game[]) => new GetAllGamesSuccess(games)),
          catchError(err => of(new GetAllGamesError(err)))
        )
      )
    );


  /*@Effect()
  getGame$ = this.actions$
    .ofType(gameActions.GET_GAME)
    .map((action: GetGame) => action.payload)
    .switchMap(id => this.svc.findById(id))
    .map(hero => new GetGameSuccess(hero))
    .catch((err) => [new GetGameError(err)]);*/

  @Effect()
  getGame$: Observable<Action> = this.actions$.pipe(
      ofType<GetGame>(gameActions.GET_GAME),
      mergeMap((action: GetGame) =>
        this.svc.findById(action.payload).pipe(
          map((game: Game) => new GetGameSuccess(game)),
          catchError(err => of(new GetGameError(err)))
        )
      )
    );

  /*@Effect()
  updateGame$ = this.actions$
    .ofType(gameActions.UPDATE_GAME)
    .map((action: UpdateGame) => action.payload)
    .switchMap(game => this.svc.update(game))
    .map(() => new UpdateGameSuccess())
    .catch((err) => [new UpdateGameError(err)]);*/

    @Effect()
    public updateGame$: Observable<Action> = this.actions$.pipe(
      ofType<UpdateGame>(gameActions.UPDATE_GAME),
      mergeMap((action: UpdateGame) =>
        this.svc.update(action.payload).pipe(
          map((game: Game) => new UpdateGameSuccess()),
          catchError(err => of(new UpdateGameError(err)))
        )
      )
    );



  /*@Effect()
  createGame$ = this.actions$
    .ofType(gameActions.CREATE_GAME)
    .map((action: AddGame) => action.payload)
    .switchMap(newGame => this.svc.insert(newGame))
    .map((response) => new AddGameSuccess(response.id))
    .catch((err) => [new AddGameError(err)]);*/

    @Effect()
    public createGame$: Observable<Action> = this.actions$.pipe(
      ofType<AddGame>(gameActions.CREATE_GAME),
      mergeMap((action: AddGame) =>
        this.svc.insert(action.payload).pipe(
          map((game: Game) => new AddGameSuccess(game.id)),
          catchError(err => of(new AddGameError(err)))
        )
      )
  );


  /*@Effect()
  removeGame$ = this.actions$
    .ofType(gameActions.DELETE_GAME)
    .map((action: RemoveGame) => action.payload)
    .switchMap(id => this.svc.delete(id))
    .map((hero: Game) => new RemoveGameSuccess(hero))
    .catch((err) => [new RemoveGameError(err)]);*/
    @Effect()
    public removeGame$: Observable<Action> = this.actions$.pipe(
      ofType<RemoveGame>(gameActions.DELETE_GAME),
      mergeMap((action: RemoveGame) =>
        this.svc.delete(action.payload).pipe(
          map((game: Game) => new RemoveGameSuccess(game)),
          catchError(err => of(new RemoveGameError(err)))
        )
      )
    );
}
