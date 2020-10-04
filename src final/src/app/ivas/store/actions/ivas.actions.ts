import { Action } from '@ngrx/store';
import { Iva } from '../../shared/iva';

export const GET_IVAS = '[All] Ivas';
export const GET_IVAS_SUCESSS ='[All]  Ivas Success';
export const GET_IVAS_ERROR ='[All] Ivas Error';

export const CREATE_IVA ='[Create] Iva';
export const CREATE_IVA_SUCCESS = '[Create] Iva Sucess';
export const CREATE_IVA_ERROR = '[Create] Iva Error';

export const GET_IVA = '[GET] Iva';
export const GET_IVA_SUCCESS = '[GET] Iva Succes';
export const GET_IVA_ERROR = '[GET] iVA Error';

export const UPDATE_IVA = '[Update] Iva';
export const UPDATE_IVA_SUCCESS = '[Update] Iva Success';
export const UPDATE_IVA_ERROR = '[Update] Iva Error';

export const DELETE_IVA = '[Delete] Iva';
export const DELETE_IVA_SUCCESS = '[Delete] Iva Success';
export const DELETE_IVA_ERROR = '[Delete] Iva Error';

//List ivas

export class GetAllIvas implements Action {
    readonly type = GET_IVAS;
}

export class GetAllIvasSuccess implements Action {
    readonly type  = GET_IVAS_SUCESSS;
    constructor(public payload: Iva[]){}
}

export class GetAllIvasError implements Action {
    readonly type = GET_IVAS_ERROR;
    constructor(public payload: Error){}
}

//Add Iva

export class AddIva implements Action {
    readonly type = CREATE_IVA
    constructor(public payload: Iva){}
}

export class AddIvaSuccess implements Action {
    readonly type = CREATE_IVA_SUCCESS;
    constructor(public payload: number) {}
}

export class AddIvaError implements Action {
    readonly type = CREATE_IVA_ERROR;
    constructor(public payload: Error){}
}

//Get Iva by Id

export class GetIva implements Action {
    readonly type = GET_IVA;
    constructor(public payload: number){}
}

export class GetIvaSuccess implements Action {
  readonly  type = GET_IVA_SUCCESS;
  constructor(public payload: Iva){}
}

export class  GetIvaError implements Action {
  readonly type =  GET_IVA_ERROR;
  constructor(public payload: Error){}
}

//Update Iva

export class UpdateIva implements Action {
    readonly type =  UPDATE_IVA;
    constructor(public payload:Iva){}
}

export class UpdateIvaSuccess implements Action {
    readonly type = UPDATE_IVA_SUCCESS;
}

export class UpdateIvaError implements Action {
    readonly type = UPDATE_IVA_ERROR;
    constructor(public payload: Error){}
}

//Delete Iva

export class DeleteIva implements Action {
  readonly  type = DELETE_IVA;
  constructor(public payload: number){}
}

export class DeleteIvaSuccess implements Action{
  readonly type = DELETE_IVA_SUCCESS;
  constructor(public payload: Iva){}
}

export class DeleteIvaError implements Action {
  readonly type = DELETE_IVA_ERROR;
  constructor(public payload:Error){}
}
