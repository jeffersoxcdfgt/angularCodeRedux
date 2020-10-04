import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as dptoActions from '../actions/departamentos.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen  } from 'rxjs/operators';
import {
GetAllDepartamentos ,
GetAllDepartamentosSuccess ,
GetAllDepartamentosError
}
from '../actions/departamentos.actions';
import { DepartamentosService } from '../services/departamentos.service';
import { Departamento } from '../../shared/departamento';

@Injectable()
export class DepartamentoEffects {
  constructor(private actions$:Actions , private svc:DepartamentosService){}

  @Effect()
  public getAlldepartamentos$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllDepartamentos>(dptoActions.GET_DPTOS),
        mergeMap((action:GetAllDepartamentos) =>
          this.svc.findAll().pipe(
              map((departamentos: Departamento[]) => new GetAllDepartamentosSuccess(departamentos)),
                catchError(err => of(new GetAllDepartamentosError(err)))
          )
      )
  );

}
