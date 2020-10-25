import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector } from '@ngrx/store';
import { Menu } from '../../shared/menu';
import  * as menuActions from '../actions/menus.actions';
import { RouterReducerState} from '@ngrx/router-store';

export interface State {
  data:Menu[];
  selected:Menu;
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
      case menuActions.GET_MENUS:{
        return {
          ...state,
          action: menuActions.GET_MENUS,
          done:false,
          selected:null,
          error:null
        }
      }
      case menuActions.GET_MENUS_SUCESSS:{
        return {
          ...state,
          data:action.payload,
          done:true,
          selected:null,
          error:null
        }
      }
      case menuActions.GET_MENUS_ERROR:{
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

export const getMenusState = createFeatureSelector < State > ('menus');
export const getAllMenus = createSelector( getMenusState , (state: State ) => state.data);

export const getMenusError = createSelector(getMenusState, (state: State) => {
  return state.action === menuActions.GET_MENUS
    ? state.error
   : null;
});
