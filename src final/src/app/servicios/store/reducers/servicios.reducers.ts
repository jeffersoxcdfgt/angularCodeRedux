import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Servicio } from '../../shared/servicio';
import  * as servicioActions from '../actions/servicios.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Servicio[];
  selected:Servicio;
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
      //Get Servicios
      case servicioActions.GET_SERVICIOS:
      {
        return {
          ...state,
          action: servicioActions.GET_SERVICIOS,
          done:false,
          selected:null,
          error:null
        }
      }
      case servicioActions.GET_SERVICIOS_SUCESSS:
      {
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case servicioActions.GET_SERVICIOS_ERROR:
      {
          return {
            ...state,
            done:true,
            selected:null,
            error:action.payload
          }
       }
       case servicioActions.CREATE_SERVICIO:
       {
           return {
             ...state,
             selected: action.payload,
             action: servicioActions.CREATE_SERVICIO,
             done: false,
             error:  null
           }
       }
       case servicioActions.CREATE_SERVICIO_SUCCESS:{
         const newServicio = {
           ...state.selected,
           serId: action.payload
         }
         const data = [
           ...state.data,
           newServicio
         ]
         return {
           ...state,
           data,
           selected: null,
           done: true,
           error:null
         }
       }
       case servicioActions.CREATE_SERVICIO_ERROR:{
            return {
              ...state,
              selected: null,
              done: true,
              error: action.payload
            }
        }
        case servicioActions.GET_SERVICIO:
        {
            return {
            ...state,
              action: servicioActions.GET_SERVICIO,
              done: false,
              selected: null,
              error:  null
            }
        }
        case servicioActions.GET_SERVICIO_SUCCESS:
        {
          return {
              ...state,
              selected: action.payload,
              done: true,
              error:  null
          }
        }
        case servicioActions.GET_SERVICIO_ERROR:
        {
          return {
            ...state,
            selected: null,
            done: true,
            error:  action.payload
          }
        }
        case servicioActions.UPDATE_SERVICIO:
        {
            return {
                ...state,
                selected: action.payload,
                action: servicioActions.UPDATE_SERVICIO,
                done: false,
                error: null
            }
        }
        case  servicioActions.UPDATE_SERVICIO_SUCCESS:
        {
                const index = state
                .data
                .findIndex(h => h.serId === state.selected.serId);
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
          case servicioActions.UPDATE_SERVICIO_ERROR:
          {
              return {
                ...state,
                done: true,
                selected : null ,
                error: action.payload
              }
          }
          case servicioActions.DELETE_SERVICIO:
          {
              const selected = state.data.find(h => h.serId === action.payload)
              return  {
                ...state,
                selected,
                action: servicioActions.DELETE_SERVICIO,
                done: false,
                error:null
              }
          }
          case servicioActions.DELETE_SERVICIO_SUCCESS:
          {
              const data = state.data.filter( h => h.serId !== state.selected.serId)
              return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
              }
          }
          case servicioActions.DELETE_SERVICIO_ERROR:
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

export const getServiciosState = createFeatureSelector < State > ('servicios');

export const getAllServicios = createSelector( getServiciosState , (state: State ) => state.data);

export const getAllServiciosError = createSelector(getServiciosState, (state: State) => {
  return state.action === servicioActions.GET_SERVICIOS
    ? state.error
   : null;
});

export const isCreated =  createSelector( getServiciosState , ( state: State ) =>
  state.action === servicioActions.CREATE_SERVICIO && state.done && !state.error);

export const getCreateError = createSelector( getServiciosState , (state: State) => {
      return state.action === servicioActions.CREATE_SERVICIO
       ? state.error
       : null;
});

export const getServicio = createSelector( getServiciosState , ( state : State ) => {
  if(state.action === servicioActions.GET_SERVICIO && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const isUpdated = createSelector(getServiciosState , (state : State ) =>
  state.action === servicioActions.UPDATE_SERVICIO && state.done && !state.error);

export const getUpdateError = createSelector(getServiciosState, (state: State) => {
    return state.action === servicioActions.GET_SERVICIOS
      ? state.error
     : null;
});

export const getDeleteError = createSelector(getServiciosState, (state: State) => {
    return state.action === servicioActions.DELETE_SERVICIO
      ? state.error
     : null;
});
