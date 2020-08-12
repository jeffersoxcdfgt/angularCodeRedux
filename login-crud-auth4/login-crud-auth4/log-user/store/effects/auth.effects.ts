import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
//import { Observable } from 'rxjs/Observable';
import { Observable , of  } from 'rxjs';
import { catchError, map, mergeMap , switchMap , tap  } from 'rxjs/operators';
/*import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';*/

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  LogOut,GetStatus
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  /*@Effect()
  LogIn: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password)
        .map((user) => {
          return new LogInSuccess({token: user.token, email: payload.email});
        })
        .catch((error) => {
          return Observable.of(new LogInFailure({ error: error }));
        });
    });*/

 @Effect()
 LogIn: Observable<Action> = this.actions.pipe(
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
  );


  /*@Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );*/

  @Effect({ dispatch: false })
  LogInSuccess: Observable<Action> = this.actions.pipe(
    ofType<LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
      map((action: LogInSuccess) => action.payload),
        tap((user) => {
         //localStorage.setItem('token', user.payload.token);
          localStorage.setItem('token', user.token);
          //this.router.navigateByUrl('/');
          this.router.navigateByUrl('log-user/status');
        })
  );

  /*@Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );*/


  @Effect({ dispatch: false })
  LogInFailure: Observable<Action> = this.actions.pipe(
    ofType<LogIn>(AuthActionTypes.LOGIN_FAILURE)
  );


 /* @Effect()
  SignUp: Observable<any> = this.actions
    .ofType(AuthActionTypes.SIGNUP)
    .map((action: SignUp) => action.payload)
    .switchMap(payload => {
      return this.authService.signUp(payload.email, payload.password)
        .map((user) => {
          return new SignUpSuccess({token: user.token, email: payload.email});
        })
        .catch((error) => {
          return Observable.of(new SignUpFailure({ error: error }));
        });
    });*/

    @Effect()
    SignUp: Observable<Action> = this.actions.pipe(
      ofType<SignUp>(AuthActionTypes.SIGNUP),
         map((action: SignUp) => action.payload),
           switchMap(payload => {
           return this.authService.signUp(payload.email, payload.password).pipe(
             map((user) => {
               return new SignUpSuccess({token: user.token, email: payload.email})}
             ),
             catchError((error) => {
               return of(new SignUpFailure({ error: error }))
             })
           )
         })
    );


  /*@Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );*/

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<Action> = this.actions.pipe(
    ofType<SignUpSuccess>(AuthActionTypes.SIGNUP_SUCCESS),
      map((action: SignUpSuccess) => action.payload),
        tap((user) => {
          localStorage.setItem('token', user.payload.token);
          this.router.navigateByUrl('/');
        })
  );

  /*@Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );*/

  @Effect({ dispatch: false })
  SignUpFailure: Observable<Action> = this.actions.pipe(
    ofType<LogIn>(AuthActionTypes.SIGNUP_FAILURE)
  );

  /*@Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );*/

  @Effect({ dispatch: false })
  LogOut: Observable<Action> = this.actions.pipe(
    ofType<LogOut>(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );

  /*@Effect({ dispatch: false })
  GetStatus: Observable<any> = this.actions
    .ofType(AuthActionTypes.GET_STATUS)
    .switchMap(payload => {
      return this.authService.getStatus();
    });*/


    @Effect({ dispatch: false })
    GetStatus: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.GET_STATUS),
         map((action: any) => action.payload),
           switchMap(payload => {
             return this.authService.getStatus();
         })
    );

}
