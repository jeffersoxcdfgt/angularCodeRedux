import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable , of  } from 'rxjs';
import { catchError, map, mergeMap , switchMap , tap , exhaustMap  } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User  } from '../../shared/user';
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  LogOut,
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

 @Effect()
 /*LogIn: Observable<Action> = this.actions.pipe(
   ofType<LogIn>(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
        switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password).pipe(
          map((user) => {
            return new LogInSuccess({token: user.token, email: payload.email})}
          ),
          catchError((error) => {
            return of(new LogInFailure({ error: error }))
          })
        )
      })
  );*/

  @Effect()
  public LogIn : Observable<Action> = this.actions.pipe(
      ofType<LogIn>(AuthActionTypes.LOGIN),
        exhaustMap((action:LogIn) =>
          this.authService.logIn(action.payload.email, action.payload.password).pipe(
            map((user: User) => new LogInSuccess({token: user.token, email: action.payload.email})),
              catchError(err => of(new LogInFailure({ error: err })))
          )
      )
  );



  @Effect({ dispatch: false })
  LogInSuccess: Observable<Action> = this.actions.pipe(
    ofType<LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
      map((action: LogInSuccess) => action.payload),
        tap((user) => {
          localStorage.setItem('token', user.token);
          this.router.navigateByUrl('/menus');
        })
  );


  @Effect({ dispatch: false })
  LogInFailure: Observable<Action> = this.actions.pipe(
    ofType<LogIn>(AuthActionTypes.LOGIN_FAILURE)
  );



  @Effect({ dispatch: false })
  LogOut: Observable<Action> = this.actions.pipe(
    ofType<LogOut>(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );

}
