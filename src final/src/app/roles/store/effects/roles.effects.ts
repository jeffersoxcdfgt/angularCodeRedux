import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as rolActions from '../actions/roles.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen ,tap  } from 'rxjs/operators';
import {
GetAllRoles ,
GetAllRolesSuccess ,
GetAllRolesError,
AddRol,
AddRolSuccess,
AddRolError,
GetRol,
GetRolSuccess,
GetRolError,
UpdateRol,
UpdateRolSuccess,
UpdateRolError,
DeleteRol,
DeleteRolSuccess,
DeleteRolError
}
from '../actions/roles.actions';
import { RolesService } from '../services/roles.service';
import { Rol } from '../../shared/rol';


@Injectable()
export class RolEffects {
    constructor(private actions$:Actions , private svc:RolesService){}

    @Effect()
    public getAllRoles$ : Observable<Action> = this.actions$.pipe(
        ofType<GetAllRoles>(rolActions.GET_ROLES),
          mergeMap((action:GetAllRoles) =>
            this.svc.findAll().pipe(
                map((roles: Rol[]) => new GetAllRolesSuccess(roles)),
                  catchError(err => of(new GetAllRolesError(err)))
            )
        )
    );

    @Effect()
    public createRol$ :  Observable<Action> = this.actions$.pipe(
        ofType<AddRol>(rolActions.CREATE_ROL),
          mergeMap((action:AddRol) =>
            this.svc.insert(action.payload).pipe(
                map((rol:Rol) => new AddRolSuccess(rol.rolId)),
                catchError(err => of(new AddRolError(err)))
              )
          )
    );


    @Effect()
    public getRol$ : Observable<Action> =  this.actions$.pipe(
          ofType<GetRol>(rolActions.GET_ROL),
            mergeMap((action: GetRol) =>
              this.svc.findById(action.payload).pipe(
                map((rol: Rol) => new GetRolSuccess(rol)),
                  catchError(err => of(new GetRolError(err)))
            )
        )
    );

    @Effect()
    public updateRol : Observable<Action> = this.actions$.pipe(
        ofType<UpdateRol>(rolActions.UPDATE_ROL),
          mergeMap((action:UpdateRol) =>
            this.svc.update(action.payload).pipe(
              map((rol:Rol) => new UpdateRolSuccess()),
              catchError(err => of(new UpdateRolError(err)))
          )
        )
    );

    @Effect()
    public deleteRol: Observable<Action> =  this.actions$.pipe(
        ofType<DeleteRol>(rolActions.DELETE_ROL),
          mergeMap((action:DeleteRol)  =>
            this.svc.delete(action.payload).pipe(
              map((rol: Rol) => new DeleteRolSuccess(rol)),
              catchError(err => of(new DeleteRolError(err)))
            )
        )
    );
}
