import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as servicioActions from '../actions/servicios.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen ,tap  } from 'rxjs/operators';
import {
GetAllServicios ,
GetAllServiciosSuccess ,
GetAllServiciosError,
AddServicio,
AddServicioSuccess,
AddServicioError,
GetServicio,
GetServicioSuccess,
GetServicioError,
UpdateServicio,
UpdateServicioSuccess,
UpdateServicioError,
DeleteServicio,
DeleteServicioSuccess,
DeleteServicioError
}
from '../actions/servicios.actions';
import { ServiciosService } from '../services/servicios.service';
import { Servicio } from '../../shared/servicio';


@Injectable()
export class ServicioEffects {
    constructor(private actions$:Actions , private svc:ServiciosService){}

    @Effect()
    public getAllServicios$ : Observable<Action> = this.actions$.pipe(
        ofType<GetAllServicios>(servicioActions.GET_SERVICIOS),
          mergeMap((action:GetAllServicios) =>
            this.svc.findAll().pipe(
                map((servicios: Servicio[]) => new GetAllServiciosSuccess(servicios)),
                  catchError(err => of(new GetAllServiciosError(err)))
            )
        )
    );

    @Effect()
    public createServicio$ :  Observable<Action> = this.actions$.pipe(
        ofType<AddServicio>(servicioActions.CREATE_SERVICIO),
          mergeMap((action:AddServicio) =>
            this.svc.insert(action.payload).pipe(
                map((servicio:Servicio) => new AddServicioSuccess(servicio.serId)),
                catchError(err => of(new AddServicioError(err)))
              )
          )
    );


    @Effect()
    public getServicio$ : Observable<Action> =  this.actions$.pipe(
          ofType<GetServicio>(servicioActions.GET_SERVICIO),
            mergeMap((action: GetServicio) =>
              this.svc.findById(action.payload).pipe(
                map((servicio: Servicio) => new GetServicioSuccess(servicio)),
                  catchError(err => of(new GetServicioError(err)))
            )
        )
    );

    @Effect()
    public UpdateServicio : Observable<Action> = this.actions$.pipe(
        ofType<UpdateServicio>(servicioActions.UPDATE_SERVICIO),
          mergeMap((action:UpdateServicio) =>
            this.svc.update(action.payload).pipe(
              map((servicio:Servicio) => new UpdateServicioSuccess()),
              catchError(err => of(new UpdateServicioError(err)))
          )
        )
    );

    @Effect()
    public deleteServicio: Observable<Action> =  this.actions$.pipe(
        ofType<DeleteServicio>(servicioActions.DELETE_SERVICIO),
          mergeMap((action:DeleteServicio)  =>
            this.svc.delete(action.payload).pipe(
              map((servicio: Servicio) => new DeleteServicioSuccess(servicio)),
              catchError(err => of(new DeleteServicioError(err)))
            )
        )
    );
}
