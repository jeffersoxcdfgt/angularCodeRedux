import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Contrato } from '../../shared/contrato';
import  * as contratoActions from '../actions/contratos.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Contrato[];
  selected:Contrato;
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
      //Get Contratos
      case contratoActions.GET_CONTRATOS:
      {
        return {
          ...state,
          action: contratoActions.GET_CONTRATOS,
          done:false,
          selected:null,
          error:null
        }
      }
      case contratoActions.GET_CONTRATOS_SUCESSS:
      {
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case contratoActions.GET_CONTRATOS_ERROR:
      {
          return {
            ...state,
            done:true,
            selected:null,
            error:action.payload
          }
       }
       case contratoActions.CREATE_CONTRATO:
       {
           return {
             ...state,
             selected: action.payload,
             action: contratoActions.CREATE_CONTRATO,
             done: false,
             error:  null
           }
       }
       case contratoActions.CREATE_CONTRATO_SUCCESS:{
         const newContrato = {
           ...state.selected,
           id: action.payload.contNumero
         }
         const data = [
           ...state.data,
           newContrato
         ]
         return {
           ...state,
           data,
           selected: action.payload,
           done: true,
           error:null
         }
       }
       case contratoActions.CREATE_CONTRATO_ERROR:{
            return {
              ...state,
              selected: null,
              done: true,
              error: action.payload
            }
        }
        case contratoActions.GET_CONTRATO:
        {
            return {
            ...state,
              action: contratoActions.GET_CONTRATO,
              done: false,
              selected: null,
              error:  null
            }
        }
        case contratoActions.GET_CONTRATO_SUCCESS:
        {
          return {
              ...state,
              selected: action.payload,
              done: true,
              error:  null
          }
        }
        case contratoActions.GET_CONTRATO_ERROR:
        {
          return {
            ...state,
            selected: null,
            done: true,
            error:  action.payload
          }
        }
        case contratoActions.UPDATE_CONTRATO:
        {
            return {
                ...state,
                selected: action.payload,
                action: contratoActions.UPDATE_CONTRATO,
                done: false,
                error: null
            }
        }
        case  contratoActions.UPDATE_CONTRATO_SUCCESS:
        {
                const index = state
                .data
                .findIndex(h => h.clclId === state.selected.clclId);
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
          case contratoActions.UPDATE_CONTRATO_ERROR:
          {
              return {
                ...state,
                done: true,
                selected : null ,
                error: action.payload
              }
          }
          case contratoActions.DELETE_CONTRATO:
          {
              const selected = state.data.find(h => h.clclId === action.payload)
              return  {
                ...state,
                selected,
                action: contratoActions.DELETE_CONTRATO,
                done: false,
                error:null
              }
          }
          case contratoActions.DELETE_CONTRATO_SUCCESS:
          {
              const data = state.data.filter( h => h.clclId !== state.selected.clclId)
              return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
              }
          }
          case contratoActions.DELETE_CONTRATO_ERROR:
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

export const getContratosState = createFeatureSelector < State > ('contratos');

export const getAllContratos = createSelector( getContratosState , (state: State ) => state.data);
export const getAllContratosError = createSelector(getContratosState, (state: State) => {
  return state.action === contratoActions.GET_CONTRATOS
    ? state.error
   : null;
});


export const isCreated = createSelector( getContratosState , (state: State) => {
    return state.action === contratoActions.CREATE_CONTRATO  && state.done && !state.error   ? state.selected
   : null;
})

export const getCreateError = createSelector( getContratosState , (state: State) => {
      return state.action === contratoActions.CREATE_CONTRATO
       ? state.error
       : null;
});

export const getContrato = createSelector( getContratosState , ( state : State ) => {
  if(state.action === contratoActions.GET_CONTRATO && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const isUpdated = createSelector(getContratosState , (state : State ) =>
  state.action === contratoActions.UPDATE_CONTRATO && state.done && !state.error);

export const getUpdateError = createSelector(getContratosState, (state: State) => {
    return state.action === contratoActions.GET_CONTRATOS
      ? state.error
     : null;
});

export const getDeleteError = createSelector(getContratosState, (state: State) => {
    return state.action === contratoActions.DELETE_CONTRATO
      ? state.error
     : null;
});
