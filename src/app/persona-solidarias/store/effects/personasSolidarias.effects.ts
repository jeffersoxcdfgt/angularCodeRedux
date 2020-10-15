import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as personasSolidariasActions from '../actions/personasSolidarias.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllPersonasSolidarias ,
GetAllPersonasSolidariasSuccess ,
GetAllPersonasSolidariasError
}
from '../actions/personasSolidarias.actions';
import { PersonasSolidariasService } from '../services/personasSolidarias.service';
import { PersonaSolidaria } from '../../shared/PersonaSolidaria';

@Injectable()
export class PersonaSolidariaEffects {
  constructor(private actions$:Actions , private svc:PersonasSolidariasService){}

  @Effect()
  public getAllpersonasSolidarias$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllPersonasSolidarias>(personasSolidariasActions.GET_PERSONAS_SOLIDARIAS),
        mergeMap((action:GetAllPersonasSolidarias) =>
          this.svc.findAll().pipe(
            map((personasSolidarias: PersonaSolidaria[]) => new GetAllPersonasSolidariasSuccess(personasSolidarias)),
            catchError(err => of(new GetAllPersonasSolidariasError(err)))
          )
      )
  );

}
