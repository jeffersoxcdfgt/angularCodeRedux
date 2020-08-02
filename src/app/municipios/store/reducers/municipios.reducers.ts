import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Municipio } from '../../shared/municipio';
import  * as municipioActions from '../actions/municipios.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Municipio[];
  selected:Municipio;
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
      case municipioActions.GET_MUNICIPIOS:
        return {
          ...state,
          action: municipioActions.GET_MUNICIPIOS,
          done:false,
          selected:null,
          error:null
        }
      case municipioActions.GET_MUNICIPIOS_SUCESSS:
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      case municipioActions.GET_MUNICIPIOS_ERROR:
        return {
          ...state,
          done:true,
          selected:null,
          error:action.payload
        }
    }
    return state;
}

export const getMunicipiosState = createFeatureSelector < State > ('municipios');
export const getAllMunicipios = createSelector( getMunicipiosState , (state: State ) => state.data);

export const getMunicipiosError = createSelector(getMunicipiosState, (state: State) => {
    return state.action === municipioActions.GET_MUNICIPIOS
      ? state.error
     : null;
});



export const selectRouterState = createFeatureSelector<RouterReducerState>('router');
export const isRouterLog = createSelector( selectRouterState, router => router.state);
