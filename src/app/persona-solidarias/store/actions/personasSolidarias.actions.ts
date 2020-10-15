import { Action } from '@ngrx/store';
import { PersonaSolidaria } from '../../shared/PersonaSolidaria';

export const GET_PERSONAS_SOLIDARIAS = '[All] Personas Solidarias';
export const GET_PERSONAS_SOLIDARIAS_SUCESSS ='[All]  Personas Solidarias Success';
export const GET_PERSONAS_SOLIDARIAS_ERROR ='[All] Personas Solidarias Error';

//List Personas Solidarias

export class GetAllPersonasSolidarias implements Action {
    readonly type = GET_PERSONAS_SOLIDARIAS;
}

export class GetAllPersonasSolidariasSuccess implements Action {
    readonly type  = GET_PERSONAS_SOLIDARIAS_SUCESSS;
    constructor(public payload: PersonaSolidaria[]){}
}

export class GetAllPersonasSolidariasError implements Action {
    readonly type = GET_PERSONAS_SOLIDARIAS_ERROR;
    constructor(public payload: Error){}
}
