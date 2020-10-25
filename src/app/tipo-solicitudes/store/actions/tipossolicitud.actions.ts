import { Action } from '@ngrx/store';
import { TipoSolicitud } from '../../shared/Tiposolicitud';

export const GET_TIPOS_SOLICITUD = '[All] Tipo Solicitud';
export const GET_TIPOS_SOLICITUD_SUCESSS ='[All]  Tipos Solicitud Success';
export const GET_TIPOS_SOLICITUD_ERROR ='[All] Tipos Solicitud Error';

//List Tipos Solicitud

export class GetAllTiposSolicitud implements Action {
    readonly type = GET_TIPOS_SOLICITUD;
}

export class GetAllTiposSolicitudSuccess implements Action {
    readonly type  = GET_TIPOS_SOLICITUD_SUCESSS;
    constructor(public payload: TipoSolicitud[]){}
}

export class GetAllTiposSolicitudError implements Action {
    readonly type = GET_TIPOS_SOLICITUD_ERROR;
    constructor(public payload: Error){}
}
