import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as usuarioActions from '../actions/usuarios.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllUsuarios ,
GetAllUsuariosSuccess ,
GetAllUsuariosError ,
}
from '../actions/usuarios.actions';
import { UsuarioService } from '../services/usuarios.service';
import { Usuario } from '../../shared/usuario';

@Injectable()
export class UsuarioEffects {
  constructor(private actions$:Actions , private svc:UsuarioService){}

  @Effect()
  public getAllusuarios$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllUsuarios>(usuarioActions.GET_USUARIOS),
        mergeMap((action:GetAllUsuarios) =>
          this.svc.findAll().pipe(
            map((usuarios: Usuario[]) => new GetAllUsuariosSuccess(usuarios)),
            catchError(err => of(new GetAllUsuariosError(err)))
          )
      )
  );
}
