import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Persona } from '../../shared/persona';
import  * as personaActions from '../actions/personas.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Persona[];
  selected:Persona;
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
      //Get Personas
      case personaActions.GET_PERSONAS:
      {
        return {
          ...state,
          action: personaActions.GET_PERSONAS,
          done:false,
          selected:null,
          error:null
        }
      }
      case personaActions.GET_PERSONAS_SUCESSS:
      {
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case personaActions.GET_PERSONAS_ERROR:
      {
          return {
            ...state,
            done:true,
            selected:null,
            error:action.payload
          }
       }
       case personaActions.CREATE_PERSONA:
       {
           return {
             ...state,
             selected: action.payload,
             action: personaActions.CREATE_PERSONA,
             done: false,
             error:  null
           }
       }
       case personaActions.CREATE_PERSONA_SUCCESS:{
         const newPersona = {
           ...state.selected,
           id: action.payload.persId
         }
         const data = [
           ...state.data,
           newPersona
         ]
         return {
           ...state,
           data,
           selected: null,
           done: true,
           error:null
         }
       }
       case personaActions.CREATE_PERSONA_ERROR:{
            return {
              ...state,
              selected: null,
              done: true,
              error: action.payload
            }
        }
        case personaActions.GET_PERSONA:
        {
            return {
            ...state,
              action: personaActions.GET_PERSONA,
              done: false,
              selected: null,
              error:  null
            }
        }
        case personaActions.GET_PERSONA_SUCCESS:
        {
          return {
              ...state,
              selected: action.payload,
              done: true,
              error:  null
          }
        }
        case personaActions.GET_PERSONA_ERROR:
        {
          return {
            ...state,
            selected: null,
            done: true,
            error:  action.payload
          }
        }
        case personaActions.UPDATE_PERSONA:
        {
            return {
                ...state,
                selected: action.payload,
                action: personaActions.UPDATE_PERSONA,
                done: false,
                error: null
            }
        }
        case  personaActions.UPDATE_PERSONA_SUCCESS:
        {
                const index = state
                .data
                .findIndex(h => h.persId === state.selected.persId);
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
          case personaActions.UPDATE_PERSONA_ERROR:
          {
              return {
                ...state,
                done: true,
                selected : null ,
                error: action.payload
              }
          }
          case personaActions.DELETE_PERSONA:
          {
              const selected = state.data.find(h => h.persId === action.payload)
              return  {
                ...state,
                selected,
                action: personaActions.DELETE_PERSONA,
                done: false,
                error:null
              }
          }
          case personaActions.DELETE_PERSONA_SUCCESS:
          {
              const data = state.data.filter( h => h.persId !== state.selected.persId)
              return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
              }
          }
          case personaActions.DELETE_PERSONA_ERROR:
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

export const getPersonasState = createFeatureSelector < State > ('personas');

export const getAllPersonas = createSelector( getPersonasState , (state: State ) => state.data);

export const getAllPersonasError = createSelector(getPersonasState, (state: State) => {
  return state.action === personaActions.GET_PERSONAS
    ? state.error
   : null;
});

export const isCreated =  createSelector( getPersonasState , ( state: State ) =>
  state.action === personaActions.CREATE_PERSONA && state.done && !state.error);

export const getCreateError = createSelector( getPersonasState , (state: State) => {
      return state.action === personaActions.CREATE_PERSONA
       ? state.error
       : null;
});

export const getPersona = createSelector( getPersonasState , ( state : State ) => {
  if(state.action === personaActions.GET_PERSONA && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const isUpdated = createSelector(getPersonasState , (state : State ) =>
  state.action === personaActions.UPDATE_PERSONA && state.done && !state.error);

export const getUpdateError = createSelector(getPersonasState, (state: State) => {
    return state.action === personaActions.GET_PERSONAS
      ? state.error
     : null;
});

export const getDeleteError = createSelector(getPersonasState, (state: State) => {
    return state.action === personaActions.DELETE_PERSONA
      ? state.error
     : null;
});
