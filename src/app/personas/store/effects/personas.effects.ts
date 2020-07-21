import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as personaActions from '../actions/personas.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen ,tap  } from 'rxjs/operators';
import {
GetAllPersonas ,
GetAllPersonasSuccess ,
GetAllPersonasError,
AddPersona,
AddPersonaSuccess,
AddPersonaError,
GetPersona,
GetPersonaSuccess,
GetPersonaError,
UpdatePersona,
UpdatePersonaSuccess,
UpdatePersonaError,
DeletePersona,
DeletePersonaSuccess,
DeletePersonaError
}
from '../actions/personas.actions';
import { PersonasService } from '../services/personas.service';
import { Persona } from '../../shared/persona';


@Injectable()
export class PersonaEffects {
    constructor(private actions$:Actions , private svc:PersonasService){}

    @Effect()
    public getAllPersonas$ : Observable<Action> = this.actions$.pipe(
        ofType<GetAllPersonas>(personaActions.GET_PERSONAS),
          mergeMap((action:GetAllPersonas) =>
            this.svc.findAll().pipe(
                map((personas: Persona[]) => new GetAllPersonasSuccess(personas)),
                  catchError(err => of(new GetAllPersonasError(err)))
            )
        )
    );

    @Effect()
    public createPersona$ :  Observable<Action> = this.actions$.pipe(
        ofType<AddPersona>(personaActions.CREATE_PERSONA),
          mergeMap((action:AddPersona) =>
            this.svc.insert(action.payload).pipe(
                map((persona:Persona) => new AddPersonaSuccess(persona.persId)),
                catchError(err => of(new AddPersonaError(err)))
              )
          )
    );


    @Effect()
    public getPersona$ : Observable<Action> =  this.actions$.pipe(
          ofType<GetPersona>(personaActions.GET_PERSONA),
            mergeMap((action: GetPersona) =>
              this.svc.findById(action.payload).pipe(
                map((persona: Persona) => new GetPersonaSuccess(persona)),
                  catchError(err => of(new GetPersonaError(err)))
            )
        )
    );

    @Effect()
    public updatePersona : Observable<Action> = this.actions$.pipe(
        ofType<UpdatePersona>(personaActions.UPDATE_PERSONA),
          mergeMap((action:UpdatePersona) =>
            this.svc.update(action.payload).pipe(
              map((persona:Persona) => new UpdatePersonaSuccess()),
              catchError(err => of(new UpdatePersonaError(err)))
          )
        )
    );

    @Effect()
    public deletePersona: Observable<Action> =  this.actions$.pipe(
        ofType<DeletePersona>(personaActions.DELETE_PERSONA),
          mergeMap((action:DeletePersona)  =>
            this.svc.delete(action.payload).pipe(
              map((persona: Persona) => new DeletePersonaSuccess(persona)),
              catchError(err => of(new DeletePersonaError(err)))
            )
        )
    );
}
