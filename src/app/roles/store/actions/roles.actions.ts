import { Action } from '@ngrx/store';
import { Rol } from '../../shared/rol';

export const GET_ROLES = '[All] Roles';
export const GET_ROLES_SUCESSS ='[All]  Roles Success';
export const GET_ROLES_ERROR ='[All] Roles Error';

export const CREATE_ROL ='[Create] Rol';
export const CREATE_ROL_SUCCESS = '[Create] Rol Sucess';
export const CREATE_ROL_ERROR = '[Create] Rol Error';

export const GET_ROL = '[GET] Rol';
export const GET_ROL_SUCCESS = '[GET] Rol Succes';
export const GET_ROL_ERROR = '[GET] Rol Error';

export const UPDATE_ROL = '[Update] Rol';
export const UPDATE_ROL_SUCCESS = '[Update] Rol Success';
export const UPDATE_ROL_ERROR = '[Update] Rol Error';

export const DELETE_ROL = '[Delete] Rol';
export const DELETE_ROL_SUCCESS = '[Delete] Rol Success';
export const DELETE_ROL_ERROR = '[Delete] Rol Error';

//List roles

export class GetAllRoles implements Action {
    readonly type = GET_ROLES;
}

export class GetAllRolesSuccess implements Action {
    readonly type  = GET_ROLES_SUCESSS;
    constructor(public payload: Rol[]){}
}

export class GetAllRolesError implements Action {
    readonly type = GET_ROLES_ERROR;
    constructor(public payload: Error){}
}

//Add Rol

export class AddRol implements Action {
    readonly type = CREATE_ROL;
    constructor(public payload: Rol){}
}

export class AddRolSuccess implements Action {
    readonly type = CREATE_ROL_SUCCESS;
    constructor(public payload: number) {}
}

export class AddRolError implements Action {
    readonly type = CREATE_ROL_ERROR;
    constructor(public payload: Error){}
}

//Get Rol by Id

export class GetRol implements Action {
    readonly type = GET_ROL;
    constructor(public payload: number){}
}

export class GetRolSuccess implements Action {
  readonly  type = GET_ROL_SUCCESS;
  constructor(public payload: Rol){}
}

export class  GetRolError implements Action {
  readonly type =  GET_ROL_ERROR;
  constructor(public payload: Error){}
}

//Update Rol

export class UpdateRol implements Action {
    readonly type =  UPDATE_ROL;
    constructor(public payload:Rol){}
}

export class UpdateRolSuccess implements Action {
    readonly type = UPDATE_ROL_SUCCESS;
}

export class UpdateRolError implements Action {
    readonly type = UPDATE_ROL_ERROR;
    constructor(public payload: Error){}
}

//Delete Rol

export class DeleteRol implements Action {
  readonly  type = DELETE_ROL;
  constructor(public payload: number){}
}

export class DeleteRolSuccess implements Action{
  readonly type = DELETE_ROL_SUCCESS;
  constructor(public payload: Rol){}
}

export class DeleteRolError implements Action {
  readonly type = DELETE_ROL_ERROR;
  constructor(public payload:Error){}
}
