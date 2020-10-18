import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { FormaPago } from '../../shared/formaPago';
import  * as formasPagosActions from '../actions/formaPagos.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:FormaPago[];
  selected:FormaPago;
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
      case formasPagosActions.GET_FORMA_PAGOS:{
        return {
          ...state,
          action: formasPagosActions.GET_FORMA_PAGOS,
          done:false,
          selected:null,
          error:null
        }
      }
      case formasPagosActions.GET_FORMA_PAGOS_SUCESSS:{
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case formasPagosActions.GET_FORMA_PAGOS_ERROR:{
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

export const getFormaPagosState = createFeatureSelector < State > ('formaspagos');
export const getAllFormaPagos = createSelector( getFormaPagosState , (state: State ) => state.data);

export const getAllFormaPagosError = createSelector(getFormaPagosState, (state: State) => {
  return state.action === formasPagosActions.GET_FORMA_PAGOS
    ? state.error
   : null;
});

export const selectRouterState = createFeatureSelector<RouterReducerState>('router');
export const isRouterLog = createSelector( selectRouterState, router => router.state);
