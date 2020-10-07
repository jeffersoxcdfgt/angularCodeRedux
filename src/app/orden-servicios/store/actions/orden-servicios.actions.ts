import { Action } from '@ngrx/store';
import { OrdenServicio } from '../../shared/orden-servicio';

export const GET_ORDENES_SERVICIO = '[All] Ordenes Servicios';
export const GET_ORDENES_SERVICIO_SUCESSS ='[All]  Ordenes Servicios Success';
export const GET_ORDENES_SERVICIO_ERROR ='[All] Ordenes Servicios Error';

export const GET_ORDEN_SERVICIO = '[GET] Orden Servicio';
export const GET_ORDEN_SERVICIO_SUCCESS = '[GET] Orden Servicio Succes';
export const GET_ORDEN_SERVICIO_ERROR = '[GET] Orden Servicio Error';

export const CREATE_ORDEN_SERVICIO ='[Create] Orden Servicio';
export const CREATE_ORDEN_SERVICIO_SUCCESS = '[Create] Orden Servicio Sucess';
export const CREATE_ORDEN_SERIVICO_ERROR = '[Create] Orden Servicio Error';

export const UPDATE_ORDEN_SERVICIO = '[Update] Orden servicio';
export const UPDATE_ORDEN_SERIVICIO_SUCCESS = '[Update] Orden Servicio Success';
export const UPDATE_ORDEN_SERVICIO_ERROR = '[Update] Orden Servicio Error';

export const DELETE_ORDEN_SERVICIO = '[Delete] Orden Servicio';
export const DELETE_ORDEN_SERVICIO_SUCCESS = '[Delete] Orden Servicio Success';
export const DELETE_ORDEN_SERVICIO_ERROR = '[Delete] Orden Servicio Error';

//List Ordenes Servicio

export class GetAllOrdenesServicios implements Action {
    readonly type = GET_ORDENES_SERVICIO;
}

export class GetAllOrdenesServiciosSuccess implements Action {
    readonly type  = GET_ORDENES_SERVICIO_SUCESSS;
    constructor(public payload: OrdenServicio[]){}
}

export class GetAllOrdenesServiciosError implements Action {
    readonly type = GET_ORDENES_SERVICIO_ERROR;
    constructor(public payload: Error){}
}

//Get Ordenes by Id

export class GetOrdenServicio implements Action {
    readonly type = GET_ORDEN_SERVICIO;
    constructor(public payload: number){}
}

export class GetOrdenServicioSuccess implements Action {
  readonly  type = GET_ORDEN_SERVICIO_SUCCESS;
  constructor(public payload: OrdenServicio){}
}

export class  GetOrdenServicioError implements Action {
  readonly type =  GET_ORDEN_SERVICIO_ERROR;
  constructor(public payload: Error){}
}

//Add Orden Servicio

export class AddOrdenServicio implements Action {
    readonly type = CREATE_ORDEN_SERVICIO;
    constructor(public payload: OrdenServicio){}
}

export class AddOrdenServicioSuccess implements Action {
    readonly type = CREATE_ORDEN_SERVICIO_SUCCESS;
    constructor(public payload: number) {}
}

export class AddOrdenServicioError implements Action {
    readonly type = CREATE_ORDEN_SERIVICO_ERROR;
    constructor(public payload: Error){}
}

//Update Orden Servicio

export class UpdateOrdenServicio implements Action {
    readonly type =  UPDATE_ORDEN_SERVICIO;
    constructor(public payload:OrdenServicio){}
}

export class UpdateOrdenServicioSuccess implements Action {
    readonly type = UPDATE_ORDEN_SERIVICIO_SUCCESS;
}

export class UpdateOrdenServicioError implements Action {
    readonly type = UPDATE_ORDEN_SERVICIO_ERROR;
    constructor(public payload: Error){}
}


//Delete Orden Servicio

export class DeleteOrdenServicio implements Action {
  readonly  type = DELETE_ORDEN_SERVICIO;
  constructor(public payload: number){}
}

export class DeleteOrdenServicioSuccess implements Action{
  readonly type = DELETE_ORDEN_SERVICIO_SUCCESS;
  constructor(public payload:OrdenServicio ){}
}

export class DeleteOrdenServicioError implements Action {
  readonly type = DELETE_ORDEN_SERVICIO_ERROR;
  constructor(public payload:Error){}
}
