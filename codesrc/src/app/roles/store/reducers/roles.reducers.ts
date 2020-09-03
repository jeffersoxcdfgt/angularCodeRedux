import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Rol } from '../../shared/rol';
import  * as rolActions from '../actions/roles.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Rol[];
  selected:Rol;
  action:string;
  done:boolean;
  error?:Error;
}

const initialState: State  = {
  data:[],
  selected:null,
  action:null,
  done:false,
  error:null
}

export function reducer (state = initialState , action :AppAction){
    switch(action.type){
      //Get Roles
      case rolActions.GET_ROLES:
      {
        return {
          ...state,
          action: rolActions.GET_ROLES,
          done:false,
          selected:null,
          error:null
        }
      }
      case rolActions.GET_ROLES_SUCESSS:
      {
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case rolActions.GET_ROLES_ERROR:
      {
          return {
            ...state,
            done:true,
            selected:null,
            error:action.payload
          }
       }
       case rolActions.CREATE_ROL:
       {
           return {
             ...state,
             selected: action.payload,
             action: rolActions.CREATE_ROL,
             done: false,
             error:  null
           }
       }
       case rolActions.CREATE_ROL_SUCCESS:{
         const newRol = {
           ...state.selected,
           id: action.payload
         }
         const data = [
           ...state.data,
           newRol
         ]
         return {
           ...state,
           data,
           selected: null,
           done: true,
           error:null
         }
       }
       case rolActions.CREATE_ROL_ERROR:{
            return {
              ...state,
              selected: null,
              done: true,
              error: action.payload
            }
        }
        case rolActions.GET_ROL:
        {
            return {
            ...state,
              action: rolActions.GET_ROL,
              done: false,
              selected: null,
              error:  null
            }
        }
        case rolActions.GET_ROL_SUCCESS:
        {
          return {
              ...state,
              selected: action.payload,
              done: true,
              error:  null
          }
        }
        case rolActions.GET_ROL_ERROR:
        {
          return {
            ...state,
            selected: null,
            done: true,
            error:  action.payload
          }
        }
        case rolActions.UPDATE_ROL:
        {
            return {
                ...state,
                selected: action.payload,
                action: rolActions.UPDATE_ROL,
                done: false,
                error: null
            }
        }
        case  rolActions.UPDATE_ROL_SUCCESS:
        {
                const index = state
                .data
                .findIndex(h => h.rolId === state.selected.rolId);
                if (index >= 0) {
                  const data = [
                    ...state.data.slice(0, index),
                    state.selected,
                    ...state.data.slice(index + 1)
                  ];
                  return {
                    ...state,
                    data,
                    done: true,
                    selected: null,
                    error: null
                  };
                }
                return state;
          }
          case rolActions.UPDATE_ROL_ERROR:
          {
              return {
                ...state,
                done: true,
                selected : null ,
                error: action.payload
              }
          }
          case rolActions.DELETE_ROL:
          {
              const selected = state.data.find(h => h.rolId === action.payload)
              return  {
                ...state,
                selected,
                action: rolActions.DELETE_ROL,
                done: false,
                error:null
              }
          }
          case rolActions.DELETE_ROL_SUCCESS:
          {
              const data = state.data.filter( h => h.rolId !== state.selected.rolId)
              return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
              }
          }
          case rolActions.DELETE_ROL_ERROR:
          {
              return {
                ...state,
                selected: null,
                done:true,
                error:action.payload
              }
          }
    }
    return state;
}

export const getRolesState = createFeatureSelector < State > ('roles');

export const getAllRoles = createSelector( getRolesState , (state: State ) => state.data);
export const getAllRolesError = createSelector(getRolesState, (state: State) => {
  return state.action === rolActions.GET_ROLES
    ? state.error
   : null;
});

export const isCreated =  createSelector( getRolesState , ( state: State ) =>
  state.action === rolActions.CREATE_ROL && state.done && !state.error);

export const getCreateError = createSelector( getRolesState , (state: State) => {
      return state.action === rolActions.CREATE_ROL
       ? state.error
       : null;
});

export const getRol = createSelector( getRolesState , ( state : State ) => {
  if(state.action === rolActions.GET_ROL && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const isUpdated = createSelector(getRolesState , (state : State ) =>
  state.action === rolActions.UPDATE_ROL && state.done && !state.error);

export const getUpdateError = createSelector(getRolesState, (state: State) => {
    return state.action === rolActions.GET_ROLES
      ? state.error
     : null;
});

export const getDeleteError = createSelector(getRolesState, (state: State) => {
    return state.action === rolActions.DELETE_ROL
      ? state.error
     : null;
});
