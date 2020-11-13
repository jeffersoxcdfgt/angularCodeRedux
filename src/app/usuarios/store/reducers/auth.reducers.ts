import { User } from '../../shared/user';
import { AuthActionTypes, All } from '../actions/auth.actions';
import { createFeatureSelector ,createSelector } from '@ngrx/store';
import * as storage from '../../../shared/storage';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error messag
  errorMessage: string | null;
}


export const initialState: State = {
  isAuthenticated:storage.getItem('auth').isAuthenticated,
  user:storage.getItem('auth').user,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.LOGOUT: {     
      return {
        ...state,
        isAuthenticated: false,
        user:null
      }
    }
    default: {   
      return state; 
    }
  }
}

export const selectAuthState = createFeatureSelector<State>('auth');
export const logOutUser = createSelector( selectAuthState , (state: State) => state);
