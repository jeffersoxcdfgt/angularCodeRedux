import { Action } from '@ngrx/store';
import { FormaPago } from '../../shared/formaPago';

export const GET_FORMA_PAGOS = '[All] Formas Pagos';
export const GET_FORMA_PAGOS_SUCESSS ='[All]  Formas Pagos Success';
export const GET_FORMA_PAGOS_ERROR ='[All] Formas Pagos Error';


//List Formas Pagos

export class GetAllFormaPagos implements Action {
    readonly type = GET_FORMA_PAGOS;
}

export class GetAllFormaPagosSuccess implements Action {
    readonly type  = GET_FORMA_PAGOS_SUCESSS;
    constructor(public payload: FormaPago[]){}
}

export class GetAllFormaPagosError implements Action {
    readonly type = GET_FORMA_PAGOS_ERROR;
    constructor(public payload: Error){}
}
