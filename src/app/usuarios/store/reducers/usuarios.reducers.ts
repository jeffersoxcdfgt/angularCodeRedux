import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Usuario } from '../../shared/usuario';
import  * as usuarioActions from '../actions/usuarios.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Usuario[];
  selected:Usuario;
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
      case usuarioActions.GET_USUARIOS:{
        return {
          ...state,
          action: usuarioActions.GET_USUARIOS,
          done:false,
          selected:null,
          error:null
        }
      }
      case usuarioActions.GET_USUARIOS_SUCESSS:{
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case usuarioActions.GET_USUARIOS_ERROR:{
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

export const getUsuariosState = createFeatureSelector < State > ('usuarios');
export const getAllUsuarios = createSelector( getUsuariosState , (state: State ) => state.data);

export const getUsuariosError = createSelector(getUsuariosState, (state: State) => {
    return state.action === usuarioActions.GET_USUARIOS
      ? state.error
     : null;
  });
