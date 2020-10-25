import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as estadosolicitudActions from '../actions/estadosolicitud.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllEstadosSolicitud ,
GetAllEstadosSolicitudSuccess ,
GetAllEstadosSolicitudError
}
from '../actions/estadosolicitud.actions';
import { EstadosSolicitudService } from '../services/estadosolicitud.service';
import { EstadoSolicitud } from '../../shared/EstadoSolicitud';

@Injectable()
export class EstadoSolicitudEffects {
  constructor(private actions$:Actions , private svc:EstadosSolicitudService){}

  @Effect()
  public getAllestadossolicitud$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllEstadosSolicitud>(estadosolicitudActions.GET_ESTADOS_SOLICITUD),
        mergeMap((action:GetAllEstadosSolicitud) =>
          this.svc.findAll().pipe(
            map((estadossolicitud: EstadoSolicitud[]) => new GetAllEstadosSolicitudSuccess(estadossolicitud)),
            catchError(err => of(new GetAllEstadosSolicitudError(err)))
          )
      )
  );
}
