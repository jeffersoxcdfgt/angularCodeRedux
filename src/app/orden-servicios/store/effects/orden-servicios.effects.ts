import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as ordenservicioActions from '../actions/orden-servicios.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllOrdenesServicios ,
GetAllOrdenesServiciosSuccess ,
GetAllOrdenesServiciosError
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
          this.svc.findAll(action.payload).pipe(
            map((ordenesServicios: OrdenServicio[]) => new GetAllOrdenesServiciosSuccess(ordenesServicios)),
            catchError(err => of(new GetAllOrdenesServiciosError(err)))
          )
      )
  );
}
