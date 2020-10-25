import { Action } from '@ngrx/store';
import { PersonaRol } from '../../shared/PersonaRol';

export const GET_PERSONAS_ROL = '[All] Personas Rol';
export const GET_PERSONAS_ROL_SUCESSS ='[All]  Personas Rol Success';
export const GET_PERSONAS_ROL_ERROR ='[All] Personas Rol Error';

//List Personas Rol

export class GetAllPersonasRol implements Action {
    readonly type = GET_PERSONAS_ROL;
    constructor(public payload:number){}
}

export class GetAllPersonasRolSuccess implements Action {
    readonly type  = GET_PERSONAS_ROL_SUCESSS;
    constructor(public payload: PersonaRol[]){}
}

export class GetAllPersonasRolError implements Action {
    readonly type = GET_PERSONAS_ROL_ERROR;
    constructor(public payload: Error){}
}
