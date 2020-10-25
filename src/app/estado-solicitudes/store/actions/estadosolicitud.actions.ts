import { Action } from '@ngrx/store';
import { EstadoSolicitud } from '../../shared/EstadoSolicitud';

export const GET_ESTADOS_SOLICITUD = '[All] Estados Solicitud';
export const GET_ESTADOS_SOLICITUD_SUCESSS ='[All]  Estados Solicitud Success';
export const GET_ESTADOS_SOLICITUD_ERROR ='[All] Estados Solicitud Error';

//List Estados Solicitud

export class GetAllEstadosSolicitud implements Action {
    readonly type = GET_ESTADOS_SOLICITUD;
}

export class GetAllEstadosSolicitudSuccess implements Action {
    readonly type  = GET_ESTADOS_SOLICITUD_SUCESSS;
    constructor(public payload: EstadoSolicitud[]){}
}

export class GetAllEstadosSolicitudError implements Action {
    readonly type = GET_ESTADOS_SOLICITUD_ERROR;
    constructor(public payload: Error){}
}
