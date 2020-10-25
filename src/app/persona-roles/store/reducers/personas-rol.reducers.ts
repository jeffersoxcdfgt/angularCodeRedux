import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { PersonaRol } from '../../shared/PersonaRol';
import  * as personarolActions from '../actions/personas-rol.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:PersonaRol[];
  selected:PersonaRol;
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
      case personarolActions.GET_PERSONAS_ROL:{
        return {
          ...state,
          selected: action.payload,
          action: personarolActions.GET_PERSONAS_ROL,
          done: false,
          error:  null
        }
      }
      case personarolActions.GET_PERSONAS_ROL_SUCESSS:{
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case personarolActions.GET_PERSONAS_ROL_ERROR:{
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

export const getPersonasRolState = createFeatureSelector < State > ('personasrolget');
export const getAllPersonasRol = createSelector( getPersonasRolState , (state: State ) => state.data);

export const getPersonasRolError = createSelector(getPersonasRolState, (state: State) => {
  return state.action === personarolActions.GET_PERSONAS_ROL
    ? state.error
   : null;
});
