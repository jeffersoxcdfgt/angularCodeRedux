import { Action } from '@ngrx/store';
import { Empresa } from '../../shared/empresa';

export const GET_EMPRESAS = '[All] Empresas';
export const GET_EMPRESAS_SUCESSS ='[All]  Empresas Success';
export const GET_EMPRESAS_ERROR ='[All] Empresas Error';

export const CREATE_EMPRESA ='[Create] Empresa';
export const CREATE_EMPRESA_SUCCESS = '[Create] Empresa Sucess';
export const CREATE_EMPRESA_ERROR = '[Create] Empresa Error';

export const GET_EMPRESA = '[GET] Empresa';
export const GET_EMPRESA_SUCCESS = '[GET] Empresa Succes';
export const GET_EMPRESA_ERROR = '[GET] Empresa Error';

export const UPDATE_EMPRESA = '[Update] Empresa';
export const UPDATE_EMPRESA_SUCCESS = '[Update] Empresa Success';
export const UPDATE_EMPRESA_ERROR = '[Update] Empresa Error';

export const DELETE_EMPRESA = '[Delete] Empresa';
export const DELETE_EMPRESA_SUCCESS = '[Delete] Empresa Success';
export const DELETE_EMPRESA_ERROR = '[Delete] Empresa Error';

//List empresas

export class GetAllEmpresas implements Action {
    readonly type = GET_EMPRESAS;
}

export class GetAllEmpresasSuccess implements Action {
    readonly type  = GET_EMPRESAS_SUCESSS;
    constructor(public payload: Empresa[]){}
}

export class GetAllEmpresasError implements Action {
    readonly type = GET_EMPRESAS_ERROR;
    constructor(public payload: Error){}
}

//Add Empresa

export class AddEmpresa implements Action {
    readonly type = CREATE_EMPRESA;
    constructor(public payload: Empresa){}
}

export class AddEmpresaSuccess implements Action {
    readonly type = CREATE_EMPRESA_SUCCESS;
    constructor(public payload: number) {}
}

export class AddEmpresaError implements Action {
    readonly type = CREATE_EMPRESA_ERROR;
    constructor(public payload: Error){}
}

//Get Empresa by Id

export class GetEmpresa implements Action {
    readonly type = GET_EMPRESA;
    constructor(public payload: number){}
}

export class GetEmpresaSuccess implements Action {
  readonly  type = GET_EMPRESA_SUCCESS;
  constructor(public payload: Empresa){}
}

export class  GetEmpresaError implements Action {
  readonly type =  GET_EMPRESA_ERROR;
  constructor(public payload: Error){}
}

//Update Empresa

export class UpdateEmpresa implements Action {
    readonly type =  UPDATE_EMPRESA;
    constructor(public payload:Empresa){}
}

export class UpdateEmpresaSuccess implements Action {
    readonly type = UPDATE_EMPRESA_SUCCESS;
}

export class UpdateEmpresaError implements Action {
    readonly type = UPDATE_EMPRESA_ERROR;
    constructor(public payload: Error){}
}

//Delete empresa

export class DeleteEmpresa implements Action {
  readonly  type = DELETE_EMPRESA;
  constructor(public payload: number){}
}

export class DeleteEmpresaSuccess implements Action{
  readonly type = DELETE_EMPRESA_SUCCESS;
  constructor(public payload: Empresa){}
}

export class DeleteEmpresaError implements Action {
  readonly type = DELETE_EMPRESA_ERROR;
  constructor(public payload:Error){}
}
