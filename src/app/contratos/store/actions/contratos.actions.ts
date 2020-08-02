import { Action } from '@ngrx/store';
import { Contrato } from '../../shared/contrato';

export const GET_CONTRATOS = '[All] Contratos';
export const GET_CONTRATOS_SUCESSS ='[All]  Contratos Success';
export const GET_CONTRATOS_ERROR ='[All] Contratos Error';

export const CREATE_CONTRATO ='[Create] Contrato';
export const CREATE_CONTRATO_SUCCESS = '[Create] Contrato Sucess';
export const CREATE_CONTRATO_ERROR = '[Create] Contrato Error';

export const GET_CONTRATO = '[GET] Contrato';
export const GET_CONTRATO_SUCCESS = '[GET] Contrato Succes';
export const GET_CONTRATO_ERROR = '[GET] Contrato Error';

export const UPDATE_CONTRATO = '[Update] Contrato';
export const UPDATE_CONTRATO_SUCCESS = '[Update] Contrato Success';
export const UPDATE_CONTRATO_ERROR = '[Update] v Error';

export const DELETE_CONTRATO = '[Delete] Contrato';
export const DELETE_CONTRATO_SUCCESS = '[Delete] Contrato Success';
export const DELETE_CONTRATO_ERROR = '[Delete] Contrato Error';

//List Contratos

export class GetAllContratos implements Action {
    readonly type = GET_CONTRATOS;
}

export class GetAllContratosSuccess implements Action {
    readonly type  = GET_CONTRATOS_SUCESSS;
    constructor(public payload: Contrato[]){}
}

export class GetAllContratosError implements Action {
    readonly type = GET_CONTRATOS_ERROR;
    constructor(public payload: Error){}
}

//Add Contrato

export class AddContrato implements Action {
    readonly type = CREATE_CONTRATO;
    constructor(public payload: Contrato){}
}

export class AddContratoSuccess implements Action {
    readonly type = CREATE_CONTRATO_SUCCESS;
    constructor(public payload: Contrato) {}
}

export class AddContratoError implements Action {
    readonly type = CREATE_CONTRATO_ERROR;
    constructor(public payload: Error){}
}

//Get Contrato by Id

export class GetContrato implements Action {
    readonly type = GET_CONTRATO;
    constructor(public payload: number){}
}

export class GetContratoSuccess implements Action {
  readonly  type = GET_CONTRATO_SUCCESS;
  constructor(public payload: Contrato){}
}

export class  GetContratoError implements Action {
  readonly type =  GET_CONTRATO_ERROR;
  constructor(public payload: Error){}
}

//Update Contrato

export class UpdateContrato implements Action {
    readonly type =  UPDATE_CONTRATO;
    constructor(public payload:Contrato){}
}

export class UpdateContratoSuccess implements Action {
    readonly type = UPDATE_CONTRATO_SUCCESS;
}

export class UpdateContratoError implements Action {
    readonly type = UPDATE_CONTRATO_ERROR;
    constructor(public payload: Error){}
}

//Delete Contrato

export class DeleteContrato implements Action {
  readonly  type = DELETE_CONTRATO;
  constructor(public payload: number){}
}

export class DeleteContratoSuccess implements Action{
  readonly type = DELETE_CONTRATO_SUCCESS;
  constructor(public payload: Contrato){}
}

export class DeleteContratoError implements Action {
  readonly type = DELETE_CONTRATO_ERROR;
  constructor(public payload:Error){}
}
