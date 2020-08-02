import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Departamento } from '../../shared/departamento';
import  * as dptoActions from '../actions/departamentos.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Departamento[];
  selected:Departamento;
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
      case dptoActions.GET_DPTOS:
        return {
          ...state,
          action: dptoActions.GET_DPTOS,
          done:false,
          selected:null,
          error:null
        }
      case dptoActions.GET_DPTOS_SUCESSS:
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      case dptoActions.GET_DPTOS_ERROR:
        return {
          ...state,
          done:true,
          selected:null,
          error:action.payload
        }
    }
    return state;
}

export const getDepartamentosState = createFeatureSelector < State > ('departamentos');
export const getAllDepartamentos = createSelector( getDepartamentosState , (state: State ) => state.data);

export const getDepartamentosError = createSelector(getDepartamentosState, (state: State) => {
    return state.action === dptoActions.GET_DPTOS
      ? state.error
     : null;
});



export const selectRouterState = createFeatureSelector<RouterReducerState>('router');
export const isRouterLog = createSelector( selectRouterState, router => router.state);
