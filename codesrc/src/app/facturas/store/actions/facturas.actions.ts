import { Action } from '@ngrx/store';
import { Factura } from '../../shared/factura';

export const GET_FACTURAS = '[All] Facturas';
export const GET_FACTURAS_SUCESSS ='[All]  Facturas Success';
export const GET_FACTURAS_ERROR ='[All] Facturas Error';

export const GET_FACTURA = '[GET] Factura';
export const GET_FACTURA_SUCCESS = '[GET] Factura Succes';
export const GET_FACTURA_ERROR = '[GET] Factura Error';

export const CREATE_FACTURA ='[Create] Factura';
export const CREATE_FACTURA_SUCCESS = '[Create] Factura Sucess';
export const CREATE_FACTURA_ERROR = '[Create] Factura Error';

export const UPDATE_FACTURA = '[Update] Factura';
export const UPDATE_FACTURA_SUCCESS = '[Update] Factura Success';
export const UPDATE_FACTURA_ERROR = '[Update] Factura Error';

export const DELETE_FACTURA = '[Delete] Factura';
export const DELETE_FACTURA_SUCCESS = '[Delete] Factura Success';
export const DELETE_FACTURA_ERROR = '[Delete] Factura Error';

//List Facturas

export class GetAllFacturas implements Action {
    readonly type = GET_FACTURAS;
}

export class GetAllFacturasSuccess implements Action {
    readonly type  = GET_FACTURAS_SUCESSS;
    constructor(public payload: Factura[]){}
}

export class GetAllFacturasError implements Action {
    readonly type = GET_FACTURAS_ERROR;
    constructor(public payload: Error){}
}

//Get Factura by Id

export class GetFactura implements Action {
    readonly type = GET_FACTURA;
    constructor(public payload: number){}
}

export class GetFacturaSuccess implements Action {
  readonly  type = GET_FACTURA_SUCCESS;
  constructor(public payload: Factura){}
}

export class  GetFacturaError implements Action {
  readonly type =  GET_FACTURA_ERROR;
  constructor(public payload: Error){}
}

//Add Factura

export class AddFactura implements Action {
    readonly type = CREATE_FACTURA;
    constructor(public payload: Factura){}
}

export class AddFacturaSuccess implements Action {
    readonly type = CREATE_FACTURA_SUCCESS;
    constructor(public payload: number) {}
}

export class AddFacturaError implements Action {
    readonly type = CREATE_FACTURA_ERROR;
    constructor(public payload: Error){}
}

//Update Factura

export class UpdateFactura implements Action {
    readonly type =  UPDATE_FACTURA;
    constructor(public payload:Factura){}
}

export class UpdateFacturaSuccess implements Action {
    readonly type = UPDATE_FACTURA_SUCCESS;
}

export class UpdateFacturaError implements Action {
    readonly type = UPDATE_FACTURA_ERROR;
    constructor(public payload: Error){}
}

//Delete Factura

export class DeleteFactura implements Action {
  readonly  type = DELETE_FACTURA;
  constructor(public payload: number){}
}

export class DeleteFacturaSuccess implements Action{
  readonly type = DELETE_FACTURA_SUCCESS;
  constructor(public payload: Factura){}
}

export class DeleteFacturaError implements Action {
  readonly type = DELETE_FACTURA_ERROR;
  constructor(public payload:Error){}
}
