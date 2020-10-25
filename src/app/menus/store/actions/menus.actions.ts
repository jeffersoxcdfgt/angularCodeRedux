import { Action } from '@ngrx/store';
import { Menu } from '../../shared/menu';

export const GET_MENUS = '[All] Menus';
export const GET_MENUS_SUCESSS ='[All]  Menus Success';
export const GET_MENUS_ERROR ='[All] Menus Error';

//List Menus

export class GetAllMenus implements Action {
    readonly type = GET_MENUS;
}

export class GetAllMenusSuccess implements Action {
    readonly type  = GET_MENUS_SUCESSS;
    constructor(public payload: Menu[]){}
}

export class GetAllMenusError implements Action {
    readonly type = GET_MENUS_ERROR;
    constructor(public payload: Error){}
}
