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
      case ordenServicioActions.CREATE_ORDEN_SERVICIO:{
        return {
          ...state,
          selected: action.payload,
          action: ordenServicioActions.CREATE_ORDEN_SERVICIO,
          done: false,
          error:  null
        }
      }
      case ordenServicioActions.CREATE_ORDEN_SERVICIO_SUCCESS:{
        return {
            ...state,
            selected: action.payload,
            done: true,
            error:  null
        }
      }
      case ordenServicioActions.CREATE_ORDEN_SERVICIO_ERROR:{
        return {
          ...state,
          selected: null,
          done: true,
          error:  action.payload
        }
      }
      case ordenServicioActions.UPDATE_ORDEN_SERVICIO:{
        return {
          ...state,
          selected: action.payload,
          action: ordenServicioActions.UPDATE_ORDEN_SERVICIO,
          done: false,
          error:  null
        }
      }
      case ordenServicioActions.UPDATE_ORDEN_SERVICIO_SUCCESS:{
        const index = state
        .data
        .findIndex(h => h.soseId === action.payload.soseId);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            {
              soseId:action.payload.soseId,
              soseNumero:action.payload.soseNumero,
              soseDescripcion:action.payload.soseDescripcion,
              sosePrecio:action.payload.sosePrecio,
              soseFechaEjecucion:action.payload.soseFechaEjecucion,
              soseFechaCreacion:action.payload.soseFechaCreacion,
                tiso: {
                  tisoId:17,
                  tisoNombre:'',
                  tisoDescripcion:'Orden de Suspención'
                },
                esso: {
                  essoId:2,
                  essoNombre:'',
                  essoDescripcion:'Inactivo'
                },
                contrato: {
                  contId:null,
                  contNumero:''
                },
              persId:'',
              ultimoNumeroSolicitudBD:''
            },
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

        /*return {
            ...state,
            selected: action.payload,
            done: true,
            error:  null
        }*/
      }
      case ordenServicioActions.UPDATE_ORDEN_SERVICIO_ERROR:{
        return {
          ...state,
          selected: null,
          done: true,
          error:  action.payload
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


export const isCreated = createSelector( getOrdenesServiciosState , ( state : State ) => {
  if(state.action === ordenServicioActions.CREATE_ORDEN_SERVICIO && state.done && !state.error){
    return state.selected;
  } else {
    return null;
  }
});


export const getCreateError = createSelector( getOrdenesServiciosState , (state: State) => {
        return state.action === ordenServicioActions.CREATE_ORDEN_SERVICIO
         ? state.error
         : null;
});


export const isUpdated = createSelector( getOrdenesServiciosState , ( state : State ) => {
  if(state.action === ordenServicioActions.UPDATE_ORDEN_SERVICIO && state.done && !state.error){
    return state.selected;
  } else {
    return null;
  }
});

/*export const isUpdated = createSelector(getOrdenesServiciosState , (state : State ) =>
  state.action === ordenServicioActions.UPDATE_ORDEN_SERVICIO && state.done && !state.error);*/


export const getUpdateError = createSelector( getOrdenesServiciosState , (state: State) => {
        return state.action === ordenServicioActions.UPDATE_ORDEN_SERVICIO
         ? state.error
         : null;
});
