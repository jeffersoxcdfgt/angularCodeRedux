import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as personarolActions from '../actions/personas-rol.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllPersonasRol ,
GetAllPersonasRolSuccess ,
GetAllPersonasRolError
}
from '../actions/personas-rol.actions';
import { PersonasRolService } from '../services/personas-rol.service';
import { PersonaRol } from '../../shared/PersonaRol';

@Injectable()
export class PersonaRolEffects {
  constructor(private actions$:Actions , private svc:PersonasRolService){}

  @Effect()
  public getAllpersonasrol$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllPersonasRol>(personarolActions.GET_PERSONAS_ROL),
        mergeMap((action:GetAllPersonasRol) =>
          this.svc.findAll(action.payload).pipe(
            map((personasrol: PersonaRol[]) => new GetAllPersonasRolSuccess(personasrol)),
            catchError(err => of(new GetAllPersonasRolError(err)))
          )
      )
  );
}
