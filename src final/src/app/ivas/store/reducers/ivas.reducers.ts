import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Iva } from '../../shared/iva';
import  * as ivaActions from '../actions/ivas.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Iva[];
  selected:Iva;
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
      //Get Ivas
      case ivaActions.GET_IVAS:
      {
        return {
          ...state,
          action: ivaActions.GET_IVAS,
          done:false,
          selected:null,
          error:null
        }
      }
      case ivaActions.GET_IVAS_SUCESSS:
      {
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case ivaActions.GET_IVAS_ERROR:
      {
        debugger
          return {
            ...state,
            done:true,
            selected:null,
            error:action.payload
          }
       }
       case ivaActions.CREATE_IVA:
       {
           return {
             ...state,
             selected: action.payload,
             action: ivaActions.CREATE_IVA,
             done: false,
             error:  null
           }
       }
       case ivaActions.CREATE_IVA_SUCCESS:{
         const newIva = {
           ...state.selected,
           ivaId: action.payload
         }
         const data = [
           ...state.data,
           newIva
         ]
         return {
           ...state,
           data,
           selected: null,
           done: true,
           error:null
         }
       }
       case ivaActions.CREATE_IVA_ERROR:{
            return {
              ...state,
              selected: null,
              done: true,
              error: action.payload
            }
        }
        case ivaActions.GET_IVA:
        {
            return {
            ...state,
              action: ivaActions.GET_IVA,
              done: false,
              selected: null,
              error:  null
            }
        }
        case ivaActions.GET_IVA_SUCCESS:
        {
          return {
              ...state,
              selected: action.payload,
              done: true,
              error:  null
          }
        }
        case ivaActions.GET_IVA_ERROR:
        {
          return {
            ...state,
            selected: null,
            done: true,
            error:  action.payload
          }
        }
        case ivaActions.UPDATE_IVA:
        {
            return {
                ...state,
                selected: action.payload,
                action: ivaActions.UPDATE_IVA,
                done: false,
                error: null
            }
        }
        case  ivaActions.UPDATE_IVA_SUCCESS:
        {
                const index = state
                .data
                .findIndex(h => h.ivaId === state.selected.ivaId);
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
          case ivaActions.UPDATE_IVA_ERROR:
          {
              return {
                ...state,
                done: true,
                selected : null ,
                error: action.payload
              }
          }
          case ivaActions.DELETE_IVA:
          {
              const selected = state.data.find(h => h.ivaId === action.payload)
              return  {
                ...state,
                selected,
                action: ivaActions.DELETE_IVA,
                done: false,
                error:null
              }
          }
          case ivaActions.DELETE_IVA_SUCCESS:
          {
              const data = state.data.filter( h => h.ivaId !== state.selected.ivaId)
              return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
              }
          }
          case ivaActions.DELETE_IVA_ERROR:
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

export const getIvasState = createFeatureSelector < State > ('ivas');

export const getAllIvas = createSelector( getIvasState , (state: State ) => state.data);
export const getAllIvasError = createSelector(getIvasState, (state: State) => {
  return state.action === ivaActions.GET_IVAS
    ? state.error
   : null;
});

export const isCreated =  createSelector( getIvasState , ( state: State ) =>
  state.action === ivaActions.CREATE_IVA && state.done && !state.error);

export const getCreateError = createSelector( getIvasState , (state: State) => {
      return state.action === ivaActions.CREATE_IVA
       ? state.error
       : null;
});

export const getIva = createSelector( getIvasState , ( state : State ) => {
  if(state.action === ivaActions.GET_IVA && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const isUpdated = createSelector(getIvasState , (state : State ) =>
  state.action === ivaActions.UPDATE_IVA && state.done && !state.error);

export const getUpdateError = createSelector(getIvasState, (state: State) => {
    return state.action === ivaActions.GET_IVAS
      ? state.error
     : null;
});

export const getDeleteError = createSelector(getIvasState, (state: State) => {
    return state.action === ivaActions.DELETE_IVA
      ? state.error
     : null;
});
