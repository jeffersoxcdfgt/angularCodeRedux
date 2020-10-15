import { Action } from '@ngrx/store';
import { Persona } from '../../shared/persona';

export const GET_PERSONAS = '[All] Personas';
export const GET_PERSONAS_SUCESSS ='[All]  Personas Success';
export const GET_PERSONAS_ERROR ='[All] Personas Error';

export const CREATE_PERSONA ='[Create] Persona';
export const CREATE_PERSONA_SUCCESS = '[Create] Persona Sucess';
export const CREATE_PERSONA_ERROR = '[Create] Persona Error';

export const GET_PERSONA = '[GET] Persona';
export const GET_PERSONA_SUCCESS = '[GET] Persona Succes';
export const GET_PERSONA_ERROR = '[GET] Persona Error';

export const UPDATE_PERSONA = '[Update] Persona';
export const UPDATE_PERSONA_SUCCESS = '[Update] Persona Success';
export const UPDATE_PERSONA_ERROR = '[Update] Persona Error';

export const DELETE_PERSONA = '[Delete] Persona';
export const DELETE_PERSONA_SUCCESS = '[Delete] Persona Success';
export const DELETE_PERSONA_ERROR = '[Delete] Persona Error';

export const GET_PERSONA_ROL = '[GET] Persona Rol';
export const GET_PERSONA_ROL_SUCCESS = '[GET] Persona Rol Succes';
export const GET_PERSONA_ROL_ERROR = '[GET] Persona Rol Error';

//List personas

export class GetAllPersonas implements Action {
    readonly type = GET_PERSONAS;
}

export class GetAllPersonasSuccess implements Action {
    readonly type  = GET_PERSONAS_SUCESSS;
    constructor(public payload: Persona[]){}
}

export class GetAllPersonasError implements Action {
    readonly type = GET_PERSONAS_ERROR;
    constructor(public payload: Error){}
}

//Add Persona

export class AddPersona implements Action {
    readonly type = CREATE_PERSONA;
    constructor(public payload: Persona){}
}

export class AddPersonaSuccess implements Action {
    readonly type = CREATE_PERSONA_SUCCESS;
    constructor(public payload: string) {}
}

export class AddPersonaError implements Action {
    readonly type = CREATE_PERSONA_ERROR;
    constructor(public payload: Error){}
}

//Get Persona by Id

export class GetPersona implements Action {
    readonly type = GET_PERSONA;
    constructor(public payload: number){}
}

export class GetPersonaSuccess implements Action {
  readonly  type = GET_PERSONA_SUCCESS;
  constructor(public payload: Persona){}
}

export class  GetPersonaError implements Action {
  readonly type =  GET_PERSONA_ERROR;
  constructor(public payload: Error){}
}

//Update Persona

export class UpdatePersona implements Action {
    readonly type =  UPDATE_PERSONA;
    constructor(public payload:Persona){}
}

export class UpdatePersonaSuccess implements Action {
    readonly type = UPDATE_PERSONA_SUCCESS;
}

export class UpdatePersonaError implements Action {
    readonly type = UPDATE_PERSONA_ERROR;
    constructor(public payload: Error){}
}

//Delete Persona

export class DeletePersona implements Action {
  readonly  type = DELETE_PERSONA;
  constructor(public payload: number){}
}

export class DeletePersonaSuccess implements Action{
  readonly type = DELETE_PERSONA_SUCCESS;
  constructor(public payload: Persona){}
}

export class DeletePersonaError implements Action {
  readonly type = DELETE_PERSONA_ERROR;
  constructor(public payload:Error){}
}


//Get Persona Rol

export class GetPersonaRol implements Action {
    readonly type = GET_PERSONA_ROL;
    constructor(public payload: number){}
}

export class GetPersonaRolSuccess implements Action {
  readonly  type = GET_PERSONA_ROL_SUCCESS;
  constructor(public payload: Persona[]){}
}

export class  GetPersonaRolError implements Action {
  readonly type =  GET_PERSONA_ROL_ERROR;
  constructor(public payload: Error){}
}
