import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Empresa } from '../../shared/empresa';
import  * as empresaActions from '../actions/empresas.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Empresa[];
  selected:Empresa;
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
      //Get Empresas
      case empresaActions.GET_EMPRESAS:
      {
        return {
          ...state,
          action: empresaActions.GET_EMPRESAS,
          done:false,
          selected:null,
          error:null
        }
      }
      case empresaActions.GET_EMPRESAS_SUCESSS:
      {
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case empresaActions.GET_EMPRESAS_ERROR:
      {
          return {
            ...state,
            done:true,
            selected:null,
            error:action.payload
          }
       }
       case empresaActions.CREATE_EMPRESA:
       {
           return {
             ...state,
             selected: action.payload,
             action: empresaActions.CREATE_EMPRESA,
             done: false,
             error:  null
           }
       }
       case empresaActions.CREATE_EMPRESA_SUCCESS:{
         const newEmpresa = {
           ...state.selected,
           emprId: action.payload
         }
         const data = [
           ...state.data,
           newEmpresa
         ]
         return {
           ...state,
           data,
           selected: null,
           done: true,
           error:null
         }
       }
       case empresaActions.CREATE_EMPRESA_ERROR:{
            return {
              ...state,
              selected: null,
              done: true,
              error: action.payload
            }
        }
        case empresaActions.GET_EMPRESA:
        {
            return {
            ...state,
              action: empresaActions.GET_EMPRESA,
              done: false,
              selected: null,
              error:  null
            }
        }
        case empresaActions.GET_EMPRESA_SUCCESS:
        {
          return {
              ...state,
              selected: action.payload,
              done: true,
              error:  null
          }
        }
        case empresaActions.GET_EMPRESA_ERROR:
        {
          return {
            ...state,
            selected: null,
            done: true,
            error:  action.payload
          }
        }
        case empresaActions.UPDATE_EMPRESA:
        {
            return {
                ...state,
                selected: action.payload,
                action: empresaActions.UPDATE_EMPRESA,
                done: false,
                error: null
            }
        }
        case  empresaActions.UPDATE_EMPRESA_SUCCESS:
        {
                const index = state
                .data
                .findIndex(h => h.emprId === state.selected.emprId);
                if (index >= 0) {
                  const data = [
                    ...state.data.slice(0, index),
                    state.selected,
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
                return state;
          }
          case empresaActions.UPDATE_EMPRESA_ERROR:
          {
              return {
                ...state,
                done: true,
                selected : null ,
                error: action.payload
              }
          }
          case empresaActions.DELETE_EMPRESA:
          {
              const selected = state.data.find(h => h.emprId === action.payload)
              return  {
                ...state,
                selected,
                action: empresaActions.DELETE_EMPRESA,
                done: false,
                error:null
              }
          }
          case empresaActions.DELETE_EMPRESA_SUCCESS:
          {
              const data = state.data.filter( h => h.emprId !== state.selected.emprId)
              return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
              }
          }
          case empresaActions.DELETE_EMPRESA_ERROR:
          {
              return {
                ...state,
                selected: null,
                done:true,
                error:action.payload
              }
          }
    }
    return state;
}

export const getEmpresasState = createFeatureSelector < State > ('empresas');

export const getAllEmpresas = createSelector( getEmpresasState , (state: State ) => state.data);

export const getAllEmpresasError = createSelector(getEmpresasState, (state: State) => {
  return state.action === empresaActions.GET_EMPRESAS
    ? state.error
   : null;
});

export const isCreated =  createSelector( getEmpresasState , ( state: State ) =>
  state.action === empresaActions.CREATE_EMPRESA && state.done && !state.error);


export const getCreateError = createSelector( getEmpresasState , (state: State) => {
      return state.action === empresaActions.CREATE_EMPRESA
       ? state.error
       : null;
});

export const getEmpresa = createSelector( getEmpresasState , ( state : State ) => {
  if(state.action === empresaActions.GET_EMPRESA && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const isUpdated = createSelector(getEmpresasState , (state : State ) =>
  state.action === empresaActions.UPDATE_EMPRESA && state.done && !state.error);

export const getUpdateError = createSelector(getEmpresasState, (state: State) => {
    return state.action === empresaActions.GET_EMPRESAS
      ? state.error
     : null;
});

export const getDeleteError = createSelector(getEmpresasState, (state: State) => {
    return state.action === empresaActions.DELETE_EMPRESA
      ? state.error
     : null;
});
