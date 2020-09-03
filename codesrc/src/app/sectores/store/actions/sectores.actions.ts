import { Action } from '@ngrx/store';
import { Sector } from '../../shared/sector';

export const GET_SECTORES = '[All] Sectores';
export const GET_SECTORES_SUCESSS ='[All]  Sectores Success';
export const GET_SECTORES_ERROR ='[All] Sectores Error';

export const CREATE_SECTOR ='[Create] Sector';
export const CREATE_SECTOR_SUCCESS = '[Create] Sector Sucess';
export const CREATE_SECTOR_ERROR = '[Create] Sector Error';

export const GET_SECTOR = '[GET] Sector';
export const GET_SECTOR_SUCCESS = '[GET] Sector Succes';
export const GET_SECTOR_ERROR = '[GET] Sector Error';

export const UPDATE_SECTOR = '[Update] Sector';
export const UPDATE_SECTOR_SUCCESS = '[Update] Sector Success';
export const UPDATE_SECTOR_ERROR = '[Update] Sector Error';

export const DELETE_SECTOR = '[Delete] Sector';
export const DELETE_SECTOR_SUCCESS = '[Delete] Sector Success';
export const DELETE_SECTOR_ERROR = '[Delete] Sector Error';

//List sectores

export class GetAllSectores implements Action {
    readonly type = GET_SECTORES;
}

export class GetAllSectoresSuccess implements Action {
    readonly type  = GET_SECTORES_SUCESSS;
    constructor(public payload: Sector[]){}
}

export class GetAllSectoresError implements Action {
    readonly type = GET_SECTORES_ERROR;
    constructor(public payload: Error){}
}

//Add Sector

export class AddSector implements Action {
    readonly type = CREATE_SECTOR;
    constructor(public payload: Sector){}
}

export class AddSectorSuccess implements Action {
    readonly type = CREATE_SECTOR_SUCCESS;
    constructor(public payload: number) {}
}

export class AddSectorError implements Action {
    readonly type = CREATE_SECTOR_ERROR;
    constructor(public payload: Error){}
}

//Get Sector by Id

export class GetSector implements Action {
    readonly type = GET_SECTOR;
    constructor(public payload: number){}
}

export class GetSectorSuccess implements Action {
  readonly  type = GET_SECTOR_SUCCESS;
  constructor(public payload: Sector){}
}

export class  GetSectorError implements Action {
  readonly type =  GET_SECTOR_ERROR;
  constructor(public payload: Error){}
}

//Update Sector

export class UpdateSector implements Action {
    readonly type =  UPDATE_SECTOR;
    constructor(public payload:Sector){}
}

export class UpdateSectorSuccess implements Action {
    readonly type = UPDATE_SECTOR_SUCCESS;
}

export class UpdateSectorError implements Action {
    readonly type = UPDATE_SECTOR_ERROR;
    constructor(public payload: Error){}
}

//Delete Sector

export class DeleteSector implements Action {
  readonly  type = DELETE_SECTOR;
  constructor(public payload: number){}
}

export class DeleteSectorSuccess implements Action{
  readonly type = DELETE_SECTOR_SUCCESS;
  constructor(public payload: Sector){}
}

export class DeleteSectorError implements Action {
  readonly type = DELETE_SECTOR_ERROR;
  constructor(public payload:Error){}
}
