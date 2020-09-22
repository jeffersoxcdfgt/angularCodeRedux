import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Sector } from '../../shared/sector';
import  * as sectorActions from '../actions/sectores.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Sector[];
  selected:Sector;
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
      //Get Sectores
      case sectorActions.GET_SECTORES:
      {
        return {
          ...state,
          action: sectorActions.GET_SECTORES,
          done:false,
          selected:null,
          error:null
        }
      }
      case sectorActions.GET_SECTORES_SUCESSS:
      {
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case sectorActions.GET_SECTORES_ERROR:
      {
          return {
            ...state,
            done:true,
            selected:null,
            error:action.payload
          }
       }
       case sectorActions.CREATE_SECTOR:
       {
           return {
             ...state,
             selected: action.payload,
             action: sectorActions.CREATE_SECTOR,
             done: false,
             error:  null
           }
       }
       case sectorActions.CREATE_SECTOR_SUCCESS:{
         const newSector = {
           ...state.selected,
           sectId: action.payload
         }
         const data = [
           ...state.data,
           newSector
         ]
         return {
           ...state,
           data,
           selected: null,
           done: true,
           error:null
         }
       }
       case sectorActions.CREATE_SECTOR_ERROR:{
            return {
              ...state,
              selected: null,
              done: true,
              error: action.payload
            }
        }
        case sectorActions.GET_SECTOR:
        {
            return {
            ...state,
              action: sectorActions.GET_SECTOR,
              done: false,
              selected: null,
              error:  null
            }
        }
        case sectorActions.GET_SECTOR_SUCCESS:
        {
          return {
              ...state,
              selected: action.payload,
              done: true,
              error:  null
          }
        }
        case sectorActions.GET_SECTOR_ERROR:
        {
          return {
            ...state,
            selected: null,
            done: true,
            error:  action.payload
          }
        }
        case sectorActions.UPDATE_SECTOR:
        {
            return {
                ...state,
                selected: action.payload,
                action: sectorActions.UPDATE_SECTOR,
                done: false,
                error: null
            }
        }
        case  sectorActions.UPDATE_SECTOR_SUCCESS:
        {
                const index = state
                .data
                .findIndex(h => h.sectId === state.selected.sectId);
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
          case sectorActions.UPDATE_SECTOR_ERROR:
          {
              return {
                ...state,
                done: true,
                selected : null ,
                error: action.payload
              }
          }
          case sectorActions.DELETE_SECTOR:
          {
              const selected = state.data.find(h => h.sectId === action.payload)
              return  {
                ...state,
                selected,
                action: sectorActions.DELETE_SECTOR,
                done: false,
                error:null
              }
          }
          case sectorActions.DELETE_SECTOR_SUCCESS:
          {
              const data = state.data.filter( h => h.sectId !== state.selected.sectId)
              return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
              }
          }
          case sectorActions.DELETE_SECTOR_ERROR:
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

export const getSectoresState = createFeatureSelector < State > ('sectores');

export const getAllSectores = createSelector( getSectoresState , (state: State ) => state.data);
export const getAllSectoresError = createSelector(getSectoresState, (state: State) => {
  return state.action === sectorActions.GET_SECTORES
    ? state.error
   : null;
});

export const isCreated =  createSelector( getSectoresState , ( state: State ) =>
  state.action === sectorActions.CREATE_SECTOR && state.done && !state.error);

export const getCreateError = createSelector( getSectoresState , (state: State) => {
      return state.action === sectorActions.CREATE_SECTOR
       ? state.error
       : null;
});

export const getSector = createSelector( getSectoresState , ( state : State ) => {
  if(state.action === sectorActions.GET_SECTOR && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const isUpdated = createSelector(getSectoresState , (state : State ) =>
  state.action === sectorActions.UPDATE_SECTOR && state.done && !state.error);

export const getUpdateError = createSelector(getSectoresState, (state: State) => {
    return state.action === sectorActions.GET_SECTORES
      ? state.error
     : null;
});

export const getDeleteError = createSelector(getSectoresState, (state: State) => {
    return state.action === sectorActions.DELETE_SECTOR
      ? state.error
     : null;
});
