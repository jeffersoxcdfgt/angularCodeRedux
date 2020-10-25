import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { TipoSolicitud } from '../../shared/Tiposolicitud';
import  * as tiposolicitudActions from '../actions/tipossolicitud.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:TipoSolicitud[];
  selected:TipoSolicitud;
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
      case tiposolicitudActions.GET_TIPOS_SOLICITUD:{
        return {
          ...state,
          action: tiposolicitudActions.GET_TIPOS_SOLICITUD,
          done:false,
          selected:null,
          error:null
        }
      }
      case tiposolicitudActions.GET_TIPOS_SOLICITUD_SUCESSS:{
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case tiposolicitudActions.GET_TIPOS_SOLICITUD_ERROR:{
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

export const getTiposSolicitudState = createFeatureSelector < State > ('tipossolicitud');
export const getAllTiposSolicitud = createSelector( getTiposSolicitudState , (state: State ) => state.data);

export const getTiposSolicitudError = createSelector(getTiposSolicitudState, (state: State) => {
  return state.action === tiposolicitudActions.GET_TIPOS_SOLICITUD
    ? state.error
   : null;
});
