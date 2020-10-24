import { Action } from '@ngrx/store';
import { OrdenServicio , OrdenServicioAdd, OrderServicioAddResp} from '../../shared/orden-servicio';

export const GET_ORDENES_SERVICIO = '[All] Ordenes Servicios';
export const GET_ORDENES_SERVICIO_SUCESSS ='[All]  Ordenes Servicios Success';
export const GET_ORDENES_SERVICIO_ERROR ='[All] Ordenes Servicios Error';

export const CREATE_ORDEN_SERVICIO ='[Create] Orden Servicio';
export const CREATE_ORDEN_SERVICIO_SUCCESS = '[Create] Orden Servicio Sucess';
export const CREATE_ORDEN_SERVICIO_ERROR = '[Create] Orden Servicio  Error';


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


//Add Orden Servicio

export class AddOrdenServicio implements Action {
    readonly type = CREATE_ORDEN_SERVICIO;
    constructor(public payload: OrdenServicioAdd){}
}

export class AddOrdenServicioSuccess implements Action {
    readonly type = CREATE_ORDEN_SERVICIO_SUCCESS;
    constructor(public payload: OrderServicioAddResp) {}
}

export class AddOrdenServicioError implements Action {
    readonly type = CREATE_ORDEN_SERVICIO_ERROR;
    constructor(public payload: Error){}
}
