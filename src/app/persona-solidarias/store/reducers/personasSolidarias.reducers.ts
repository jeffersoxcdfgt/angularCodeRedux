import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { PersonaSolidaria } from '../../shared/PersonaSolidaria';
import  * as personaSolidariaActions from '../actions/personasSolidarias.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:PersonaSolidaria[];
  selected:PersonaSolidaria;
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
      case personaSolidariaActions.GET_PERSONAS_SOLIDARIAS:{
        return {
          ...state,
          action: personaSolidariaActions.GET_PERSONAS_SOLIDARIAS,
          done:false,
          selected:null,
          error:null
        }
      }
      case personaSolidariaActions.GET_PERSONAS_SOLIDARIAS_SUCESSS:{
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case personaSolidariaActions.GET_PERSONAS_SOLIDARIAS_ERROR:{
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

export const getPersonasSolidariasState = createFeatureSelector < State > ('personassolidarias');
export const getAllPersonasSolidarias = createSelector( getPersonasSolidariasState , (state: State ) => state.data);

export const getPersonasSolidariasError = createSelector(getPersonasSolidariasState, (state: State) => {
    return state.action === personaSolidariaActions.GET_PERSONAS_SOLIDARIAS
      ? state.error
     : null;
  });


export const selectRouterState = createFeatureSelector<RouterReducerState>('router');
export const isRouterLog = createSelector( selectRouterState, router => router.state);
