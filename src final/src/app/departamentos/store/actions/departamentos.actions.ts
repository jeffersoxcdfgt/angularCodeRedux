import { Action } from '@ngrx/store';
import { Departamento } from '../../shared/departamento';

export const GET_DPTOS = '[All] Departamentos';
export const GET_DPTOS_SUCESSS ='[All] Departamentos Success';
export const GET_DPTOS_ERROR ='[All] Departamentos Error';

//List Departamentos

export class GetAllDepartamentos implements Action {
    readonly type = GET_DPTOS;
}

export class GetAllDepartamentosSuccess implements Action {
    readonly type  = GET_DPTOS_SUCESSS;
    constructor(public payload: Departamento[]){}
}

export class GetAllDepartamentosError implements Action {
    readonly type = GET_DPTOS_ERROR;
    constructor(public payload: Error){}
}
