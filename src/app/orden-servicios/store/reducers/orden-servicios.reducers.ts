import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { OrdenServicio } from '../../shared/orden-servicio';
import  * as ordenServicioActions from '../actions/orden-servicios.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:OrdenServicio[];
  selected:OrdenServicio;
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
      case ordenServicioActions.GET_ORDENES_SERVICIO:{
        return {
          ...state,
            action: ordenServicioActions.GET_ORDENES_SERVICIO,
            done: false,
            selected: null,
            error:  null
        }
      }
      case ordenServicioActions.GET_ORDENES_SERVICIO_SUCESSS:{
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case ordenServicioActions.GET_ORDENES_SERVICIO_ERROR:{
        return {
          ...state,
          done:true,
          selected:null,
          error:action.payload
        }
      }
    }
    return state;
}

export const getOrdenesServiciosState = createFeatureSelector < State > ('ordenesservicios');

export const getAllOrdenesServicios = createSelector( getOrdenesServiciosState , (state: State ) => state.data);
export const getOrdenesServicioError = createSelector(getOrdenesServiciosState, (state: State) => {
    return state.action === ordenServicioActions.GET_ORDENES_SERVICIO
      ? state.error
     : null;
  });

export const selectRouterState = createFeatureSelector<RouterReducerState>('router');
export const isRouterLog = createSelector( selectRouterState, router => router.state);
