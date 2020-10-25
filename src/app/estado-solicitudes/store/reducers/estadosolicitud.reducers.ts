import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { EstadoSolicitud } from '../../shared/EstadoSolicitud';
import  * as estadosolicitudActions from '../actions/estadosolicitud.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:EstadoSolicitud[];
  selected:EstadoSolicitud;
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
      case estadosolicitudActions.GET_ESTADOS_SOLICITUD:
        return {
          ...state,
          action: estadosolicitudActions.GET_ESTADOS_SOLICITUD,
          done:false,
          selected:null,
          error:null
        }
      case estadosolicitudActions.GET_ESTADOS_SOLICITUD_SUCESSS:
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      case estadosolicitudActions.GET_ESTADOS_SOLICITUD_ERROR:
        return {
          ...state,
          done:true,
          selected:null,
          error:action.payload
        }
    }
    return state;
}

export const getEstadosSolicitudState = createFeatureSelector < State > ('estadossolicitud');
export const getAllEstadosSolicitud = createSelector( getEstadosSolicitudState , (state: State ) => state.data);

export const getEstadosSolicitudError = createSelector(getEstadosSolicitudState, (state: State) => {
  return state.action === estadosolicitudActions.GET_ESTADOS_SOLICITUD
    ? state.error
   : null;
});
