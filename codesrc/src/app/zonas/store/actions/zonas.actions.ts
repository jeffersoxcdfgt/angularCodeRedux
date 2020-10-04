import { Action } from '@ngrx/store';
import { Zona , ZonaCreate} from '../../shared/zona';

export const GET_ZONAS = '[All] Zonas';
export const GET_ZONAS_SUCESSS ='[All]  Zonas Success';
export const GET_ZONAS_ERROR ='[All] Zonas Error';

export const CREATE_ZONA ='[Create] Zona';
export const CREATE_ZONA_SUCCESS = '[Create] Zona Sucess';
export const CREATE_ZONA_ERROR = '[Create] Zona Error';

export const GET_ZONA = '[GET] Zona';
export const GET_ZONA_SUCCESS = '[GET] Zona Succes';
export const GET_ZONA_ERROR = '[GET] Zona Error';

export const UPDATE_ZONA = '[Update] Zona';
export const UPDATE_ZONA_SUCCESS = '[Update] Zona Success';
export const UPDATE_ZONA_ERROR = '[Update] Zona Error';

export const DELETE_ZONA = '[Delete] Zona';
export const DELETE_ZONA_SUCCESS = '[Delete] Zona Success';
export const DELETE_ZONA_ERROR = '[Delete] Zona Error';

//List Zonas

export class GetAllZonas implements Action {
    readonly type = GET_ZONAS;
}

export class GetAllZonasSuccess implements Action {
    readonly type  = GET_ZONAS_SUCESSS;
    constructor(public payload: Zona[]){}
}

export class GetAllZonasError implements Action {
    readonly type = GET_ZONAS_ERROR;
    constructor(public payload: Error){}
}

//Add Zona

export class AddZona implements Action {
    readonly type = CREATE_ZONA;
    constructor(public payload:ZonaCreate){}
}

export class AddZonaSuccess implements Action {
    readonly type = CREATE_ZONA_SUCCESS;
    constructor(public payload: ZonaCreate) {}
}

export class AddZonaError implements Action {
    readonly type = CREATE_ZONA_ERROR;
    constructor(public payload: Error){}
}

//Get Zona by Id

export class GetZona implements Action {
    readonly type = GET_ZONA;
    constructor(public payload: number){}
}

export class GetZonaSuccess implements Action {
  readonly  type = GET_ZONA_SUCCESS;
  constructor(public payload: Zona){}
}

export class  GetZonaError implements Action {
  readonly type =  GET_ZONA_ERROR;
  constructor(public payload: Error){}
}

//Update Zona

export class UpdateZona implements Action {
    readonly type =  UPDATE_ZONA;
    constructor(public payload:ZonaCreate){}
}

export class UpdateZonaSuccess implements Action {
    readonly type = UPDATE_ZONA_SUCCESS;
}

export class UpdateZonaError implements Action {
    readonly type = UPDATE_ZONA_ERROR;
    constructor(public payload: Error){}
}

//Delete Zona

export class DeleteZona implements Action {
  readonly  type = DELETE_ZONA;
  constructor(public payload: number){}
}

export class DeleteZonaSuccess implements Action{
  readonly type = DELETE_ZONA_SUCCESS;
  constructor(public payload: Zona){}
}

export class DeleteZonaError implements Action {
  readonly type = DELETE_ZONA_ERROR;
  constructor(public payload:Error){}
}
