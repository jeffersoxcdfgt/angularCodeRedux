import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as tipossolicitudActions from '../actions/tipossolicitud.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllTiposSolicitud ,
GetAllTiposSolicitudSuccess ,
GetAllTiposSolicitudError
}
from '../actions/tipossolicitud.actions';
import { TiposSolicitudService } from '../services/tipossolicitud.service';
import { TipoSolicitud } from '../../shared/Tiposolicitud';

@Injectable()
export class TipoSolicitudEffects {
  constructor(private actions$:Actions , private svc:TiposSolicitudService){}

  @Effect()
  public getAlltipossolicitud$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllTiposSolicitud>(tipossolicitudActions.GET_TIPOS_SOLICITUD),
        mergeMap((action:GetAllTiposSolicitud) =>
          this.svc.findAll().pipe(
            map((tipossolicitud: TipoSolicitud[]) => new GetAllTiposSolicitudSuccess(tipossolicitud)),
            catchError(err => of(new GetAllTiposSolicitudError(err)))
          )
      )
  );
}
