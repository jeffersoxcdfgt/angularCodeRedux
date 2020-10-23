import { Action } from '@ngrx/store';
import { Usuario } from '../../shared/usuario';

export const GET_USUARIOS = '[All] Usuarios';
export const GET_USUARIOS_SUCESSS ='[All]  Usuarios Success';
export const GET_USUARIOS_ERROR ='[All] Usuarios Error';


//List Usuarios

export class GetAllUsuarios implements Action {
    readonly type = GET_USUARIOS;
}

export class GetAllUsuariosSuccess implements Action {
    readonly type  = GET_USUARIOS_SUCESSS;
    constructor(public payload: Usuario[]){}
}

export class GetAllUsuariosError implements Action {
    readonly type = GET_USUARIOS_ERROR;
    constructor(public payload: Error){}
}
