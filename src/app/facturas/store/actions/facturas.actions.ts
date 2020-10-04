import { Action } from '@ngrx/store';
import { Factura , CreateFactura , PagarAnularFactura} from '../../shared/factura';

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

//Get Factura by Id

export class GetFactura implements Action {
    readonly type = GET_FACTURA;
    constructor(public payload: string){}
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
    constructor(public payload: CreateFactura){}
}

export class AddFacturaSuccess implements Action {
    readonly type = CREATE_FACTURA_SUCCESS;
    constructor(public payload: CreateFactura) {}
}

export class AddFacturaError implements Action {
    readonly type = CREATE_FACTURA_ERROR;
    constructor(public payload: Error){}
}

//Update Factura

export class UpdateFactura implements Action {
    readonly type =  UPDATE_FACTURA;
    constructor(public payload:PagarAnularFactura){}
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
