import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as municipioActions from '../actions/municipios.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen  } from 'rxjs/operators';
import {
GetAllMunicipios ,
GetAllMunicipiosSuccess ,
GetAllMunicipiosError
}
from '../actions/municipios.actions';
import { MunicipiosService } from '../services/municipios.service';
import { Municipio } from '../../shared/municipio';

@Injectable()
export class MunicipioEffects {
  constructor(private actions$:Actions , private svc:MunicipiosService){}

  @Effect()
  public getAllmunicipios$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllMunicipios>(municipioActions.GET_MUNICIPIOS),
        mergeMap((action:GetAllMunicipios) =>
          this.svc.findAll().pipe(
              map((municipios: Municipio[]) => new GetAllMunicipiosSuccess(municipios)),
                catchError(err => of(new GetAllMunicipiosError(err)))
          )
      )
  );

}
