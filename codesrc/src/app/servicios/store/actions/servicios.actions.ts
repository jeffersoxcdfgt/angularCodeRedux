import { Action } from '@ngrx/store';
import { Servicio } from '../../shared/servicio';

export const GET_SERVICIOS = '[All] Servicios';
export const GET_SERVICIOS_SUCESSS ='[All]  Servicios Success';
export const GET_SERVICIOS_ERROR ='[All] Servicios Error';

export const CREATE_SERVICIO ='[Create] Servicio';
export const CREATE_SERVICIO_SUCCESS = '[Create] Servicio Sucess';
export const CREATE_SERVICIO_ERROR = '[Create] Servicio Error';

export const GET_SERVICIO = '[GET] Servicio';
export const GET_SERVICIO_SUCCESS = '[GET] Servicio Succes';
export const GET_SERVICIO_ERROR = '[GET] Servicio Error';

export const UPDATE_SERVICIO = '[Update] Servicio';
export const UPDATE_SERVICIO_SUCCESS = '[Update] Servicio Success';
export const UPDATE_SERVICIO_ERROR = '[Update] Servicio Error';

export const DELETE_SERVICIO = '[Delete] Servicio';
export const DELETE_SERVICIO_SUCCESS = '[Delete] Servicio Success';
export const DELETE_SERVICIO_ERROR = '[Delete] Servicio Error';

//List Servicios

export class GetAllServicios implements Action {
    readonly type = GET_SERVICIOS;
}

export class GetAllServiciosSuccess implements Action {
    readonly type  = GET_SERVICIOS_SUCESSS;
    constructor(public payload: Servicio[]){}
}

export class GetAllServiciosError implements Action {
    readonly type = GET_SERVICIOS_ERROR;
    constructor(public payload: Error){}
}

//Add Servicio

export class AddServicio implements Action {
    readonly type = CREATE_SERVICIO;
    constructor(public payload: Servicio){}
}

export class AddServicioSuccess implements Action {
    readonly type = CREATE_SERVICIO_SUCCESS;
    constructor(public payload: number) {}
}

export class AddServicioError implements Action {
    readonly type = CREATE_SERVICIO_ERROR;
    constructor(public payload: Error){}
}

//Get Servicio  by Id

export class GetServicio implements Action {
    readonly type = GET_SERVICIO;
    constructor(public payload: number){}
}

export class GetServicioSuccess implements Action {
  readonly  type = GET_SERVICIO_SUCCESS;
  constructor(public payload: Servicio){}
}

export class  GetServicioError implements Action {
  readonly type =  GET_SERVICIO_ERROR;
  constructor(public payload: Error){}
}

//Update Servicio

export class UpdateServicio implements Action {
    readonly type =  UPDATE_SERVICIO;
    constructor(public payload:Servicio){}
}

export class UpdateServicioSuccess implements Action {
    readonly type = UPDATE_SERVICIO_SUCCESS;
}

export class UpdateServicioError implements Action {
    readonly type = UPDATE_SERVICIO_ERROR;
    constructor(public payload: Error){}
}

//Delete Servicio

export class DeleteServicio implements Action {
  readonly  type = DELETE_SERVICIO;
  constructor(public payload: number){}
}

export class DeleteServicioSuccess implements Action{
  readonly type = DELETE_SERVICIO_SUCCESS;
  constructor(public payload: Servicio){}
}

export class DeleteServicioError implements Action {
  readonly type = DELETE_SERVICIO_ERROR;
  constructor(public payload:Error){}
}
