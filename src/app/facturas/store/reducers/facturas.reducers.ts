import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Factura } from '../../shared/factura';
import  * as facturaActions from '../actions/facturas.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Factura[];
  selected:Factura;
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
      case facturaActions.GET_FACTURA:{
          return {
          ...state,
            action: facturaActions.GET_FACTURA,
            done: false,
            selected: null,
            error:  null
          }
      }
      case facturaActions.GET_FACTURA_SUCCESS:{
        return {
            ...state,
            selected: action.payload,
            done: true,
            error:  null
        }
      }
      case facturaActions.GET_FACTURA_ERROR:{
        return {
          ...state,
          selected: null,
          done: true,
          error:  action.payload
        }
      }
      case facturaActions.CREATE_FACTURA:{
        return {
          ...state,
          selected: action.payload,
          action: facturaActions.CREATE_FACTURA,
          done: false,
          error:  null
        }
      }
      case facturaActions.CREATE_FACTURA_SUCCESS:{
          return {
            ...state,
            selected: action.payload,
            done: true,
            error:  null
        }
      }
     case facturaActions.CREATE_FACTURA_ERROR:{
          return {
            ...state,
            selected: null,
            done: true,
            error: action.payload
          }
      }
     case facturaActions.UPDATE_FACTURA:{
          return {
            ...state,
            selected: action.payload,
            action: facturaActions.UPDATE_FACTURA,
            done: false,
            error: null
          }
      }
     case  facturaActions.UPDATE_FACTURA_SUCCESS:{
            const index = state
            .data
            .findIndex(h => h.factId === state.selected.factId);
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
      case facturaActions.UPDATE_FACTURA_ERROR:{
          return {
            ...state,
            done: true,
            selected : null ,
            error: action.payload
          }
      }
      case facturaActions.DELETE_FACTURA:{
          const selected = state.data.find(h => h.factId === action.payload)
          return  {
            ...state,
            selected,
            action: facturaActions.DELETE_FACTURA,
            done: false,
            error:null
          }
      }
      case facturaActions.DELETE_FACTURA_SUCCESS:{
          const data = state.data.filter( h => h.factId !== state.selected.factId)
          return {
            ...state,
            data,
            selected: null,
            error: null,
            done: true
          }
      }
      case facturaActions.DELETE_FACTURA_ERROR:{
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

export const getFacturasState = createFeatureSelector < State > ('facturas');

export const getFactura = createSelector( getFacturasState , ( state : State ) => {
  if(state.action === facturaActions.GET_FACTURA && state.done){
    return state.selected;
  } else{
    return null;
  }
});
export const isCreated =  createSelector( getFacturasState , ( state: State ) =>
  state.action === facturaActions.CREATE_FACTURA && state.done && !state.error);

export const isUpdated = createSelector(getFacturasState , (state : State ) =>
  state.action === facturaActions.UPDATE_FACTURA && state.done && !state.error);

export const isDeleted = createSelector(getFacturasState , (state: State) =>
  state.action === facturaActions.DELETE_FACTURA && state.done && !state.error);

export const getCreateError = createSelector( getFacturasState , (state: State) => {
    return state.action === facturaActions.CREATE_FACTURA
     ? state.error
     : null;
  });

export const getDeleteError = createSelector(getFacturasState, (state: State) => {
    return state.action === facturaActions.DELETE_FACTURA
      ? state.error
     : null;
  });

export const getUpdateError = createSelector(getFacturasState, (state: State) => {
    return state.action === facturaActions.UPDATE_FACTURA
      ? state.error
     : null;
  });


  export const getFacturaError = createSelector(getFacturasState, (state: State) => {
    return state.action === facturaActions.GET_FACTURA
      ? state.error
     : null;
  });

  export const selectRouterState = createFeatureSelector<RouterReducerState>('router');
  export const isRouterLog = createSelector( selectRouterState, router => router.state);
