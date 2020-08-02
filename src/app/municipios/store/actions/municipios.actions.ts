import { Action } from '@ngrx/store';
import { Municipio } from '../../shared/municipio';

export const GET_MUNICIPIOS = '[All] Municipios';
export const GET_MUNICIPIOS_SUCESSS ='[All] Municipios Success';
export const GET_MUNICIPIOS_ERROR ='[All] Municipios Error';

//List Municipios

export class GetAllMunicipios implements Action {
    readonly type = GET_MUNICIPIOS;
}

export class GetAllMunicipiosSuccess implements Action {
    readonly type  = GET_MUNICIPIOS_SUCESSS;
    constructor(public payload: Municipio[]){}
}

export class GetAllMunicipiosError implements Action {
    readonly type = GET_MUNICIPIOS_ERROR;
    constructor(public payload: Error){}
}
