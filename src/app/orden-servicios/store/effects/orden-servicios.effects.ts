import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as ordenservicioActions from '../actions/orden-servicios.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllOrdenesServicios ,
GetAllOrdenesServiciosSuccess ,
GetAllOrdenesServiciosError ,
AddOrdenServicio ,
AddOrdenServicioSuccess ,
AddOrdenServicioError,
UpdateOrdenServicio,
UpdateOrdenServicioSuccess,
UpdateOrdenServicioError,
GetOrdenServicio,
GetOrdenServicioSuccess,
GetOrdenServicioError,
DeleteOrdenServicio,
DeleteOrdenServicioSuccess,
DeleteOrdenServicioError
}
from '../actions/orden-servicios.actions';
import { OrdenesServicioService } from '../services/orden-servicios.service';
import { OrdenServicio } from '../../shared/orden-servicio';

@Injectable()
export class OrdenServicioEffects {
  constructor(private actions$:Actions , private svc:OrdenesServicioService){}

  @Effect()
  public getAllordenesServicios$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllOrdenesServicios>(ordenservicioActions.GET_ORDENES_SERVICIO),
        mergeMap((action:GetAllOrdenesServicios) =>
          this.svc.findAll().pipe(
            map((ordenesServicios: OrdenServicio[]) => new GetAllOrdenesServiciosSuccess(ordenesServicios)),
            catchError(err => of(new GetAllOrdenesServiciosError(err)))
          )
      )
  );

  @Effect()
  public getOrdenServicio$ : Observable<Action> =  this.actions$.pipe(
      ofType<GetOrdenServicio>(ordenservicioActions.GET_ORDEN_SERVICIO),
        mergeMap((action: GetOrdenServicio) =>
          this.svc.findById(action.payload).pipe(
            map((ordenServicio: OrdenServicio) => new GetOrdenServicioSuccess(ordenServicio)),
              catchError(err => of(new GetOrdenServicioError(err)))
        )
    )
  );

  @Effect()
  public createOrdenServicio$ :  Observable<Action> = this.actions$.pipe(
      ofType<AddOrdenServicio>(ordenservicioActions.CREATE_ORDEN_SERVICIO),
        mergeMap((action:AddOrdenServicio) =>
          this.svc.insert(action.payload).pipe(
              map((ordenServicio:OrdenServicio) => new AddOrdenServicioSuccess(ordenServicio.id)),
              catchError(err => of(new AddOrdenServicioError(err)))
            )
        )
  );

  @Effect()
  public UpdateOrdenServicio : Observable<Action> = this.actions$.pipe(
      ofType<UpdateOrdenServicio>(ordenservicioActions.UPDATE_ORDEN_SERVICIO),
        mergeMap((action:UpdateOrdenServicio) =>
          this.svc.update(action.payload).pipe(
            map((ordenServicio:OrdenServicio) => new UpdateOrdenServicioSuccess()),
            catchError(err => of(new UpdateOrdenServicioError(err)))
        )
      )
  );

  @Effect()
  public DeleteOrdenServicio: Observable<Action> =  this.actions$.pipe(
      ofType<DeleteOrdenServicio>(ordenservicioActions.DELETE_ORDEN_SERVICIO),
        mergeMap((action:DeleteOrdenServicio)  =>
          this.svc.delete(action.payload).pipe(
            map((ordenServicio: OrdenServicio) => new DeleteOrdenServicioSuccess(ordenServicio)),
            catchError(err => of(new DeleteOrdenServicioError(err)))
          )
      )
  );

}
