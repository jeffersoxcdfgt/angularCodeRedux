import { Action } from '@ngrx/store';
import { OrdenServicio } from '../../shared/orden-servicio';

export const GET_ORDENES_SERVICIO = '[All] Ordenes Servicios';
export const GET_ORDENES_SERVICIO_SUCESSS ='[All]  Ordenes Servicios Success';
export const GET_ORDENES_SERVICIO_ERROR ='[All] Ordenes Servicios Error';


//List Ordenes Servicio

export class GetAllOrdenesServicios implements Action {
    readonly type = GET_ORDENES_SERVICIO;
    constructor(public payload: string){}
}

export class GetAllOrdenesServiciosSuccess implements Action {
    readonly type  = GET_ORDENES_SERVICIO_SUCESSS;
    constructor(public payload: OrdenServicio[]){}
}

export class GetAllOrdenesServiciosError implements Action {
    readonly type = GET_ORDENES_SERVICIO_ERROR;
    constructor(public payload: Error){}
}
