import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Zona } from '../../shared/zona';
import  * as zonaActions from '../actions/zonas.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Zona[];
  selected:Zona;
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
      //Get Zonas
      case zonaActions.GET_ZONAS:
      {
        return {
          ...state,
          action: zonaActions.GET_ZONAS,
          done:false,
          selected:null,
          error:null
        }
      }
      case zonaActions.GET_ZONAS_SUCESSS:
      {
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case zonaActions.GET_ZONAS_ERROR:
      {
          return {
            ...state,
            done:true,
            selected:null,
            error:action.payload
          }
       }
       case zonaActions.CREATE_ZONA:
       {
           return {
             ...state,
             selected: action.payload,
             action: zonaActions.CREATE_ZONA,
             done: false,
             error:  null
           }
       }
       case zonaActions.CREATE_ZONA_SUCCESS:{
         const newZona = {
           ...state.selected,
           zonaId: action.payload[0].zonaId
         }
         const data = [
           ...state.data,
           newZona
         ]
         return {
           ...state,
           data,
           selected: null,
           done: true,
           error:null
         }
       }
       case zonaActions.CREATE_ZONA_ERROR:{
         debugger
            return {
              ...state,
              selected: null,
              done: true,
              error: action.payload
            }
        }
        case zonaActions.GET_ZONA:
        {
            return {
            ...state,
              action: zonaActions.GET_ZONA,
              done: false,
              selected: null,
              error:  null
            }
        }
        case zonaActions.GET_ZONA_SUCCESS:
        {
          return {
              ...state,
              selected: action.payload,
              done: true,
              error:  null
          }
        }
        case zonaActions.GET_ZONA_ERROR:
        {
          return {
            ...state,
            selected: null,
            done: true,
            error:  action.payload
          }
        }
        case zonaActions.UPDATE_ZONA:
        {
            return {
                ...state,
                selected: action.payload,
                action: zonaActions.UPDATE_ZONA,
                done: false,
                error: null
            }
        }
        case  zonaActions.UPDATE_ZONA_SUCCESS:
        {
            const index = state
                .data
                .findIndex(h => h.zonaId === state.selected.zonaId);
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
          case zonaActions.UPDATE_ZONA_ERROR:
          {
              return {
                ...state,
                done: true,
                selected : null ,
                error: action.payload
              }
          }
          case zonaActions.DELETE_ZONA:
          {
              const selected = state.data.find(h => h.zonaId === action.payload)
              return  {
                ...state,
                selected,
                action: zonaActions.DELETE_ZONA,
                done: false,
                error:null
              }
          }
          case zonaActions.DELETE_ZONA_SUCCESS:
          {
              const data = state.data.filter( h => h.zonaId !== state.selected.zonaId)
              return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
              }
          }
          case zonaActions.DELETE_ZONA_ERROR:
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

export const getZonasState = createFeatureSelector < State > ('zonas');

export const getAllZonas = createSelector( getZonasState , (state: State ) => state.data);
export const getAllZonasError = createSelector(getZonasState, (state: State) => {
  return state.action === zonaActions.GET_ZONAS
    ? state.error
   : null;
});

export const isCreated =  createSelector( getZonasState , ( state: State ) =>
  state.action === zonaActions.CREATE_ZONA && state.done && !state.error);

export const getCreateError = createSelector( getZonasState , (state: State) => {
      return state.action === zonaActions.CREATE_ZONA
       ? state.error
       : null;
});

export const getZona = createSelector( getZonasState , ( state : State ) => {
  if(state.action === zonaActions.GET_ZONA && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const isUpdated = createSelector(getZonasState , (state : State ) =>
  state.action === zonaActions.UPDATE_ZONA && state.done && !state.error);

export const getUpdateError = createSelector(getZonasState, (state: State) => {
    return state.action === zonaActions.GET_ZONAS
      ? state.error
     : null;
});

export const getDeleteError = createSelector(getZonasState, (state: State) => {
    return state.action === zonaActions.DELETE_ZONA
      ? state.error
     : null;
});
