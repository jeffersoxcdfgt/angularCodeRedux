import * as citiesActions from './cities.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {City} from '../shared/city';

export interface State {
  data: City[];
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  action: null,
  done: false,
  error: null
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
    /*************************
     * GET all Cities actions
     ************************/
    case citiesActions.GET_CITIES:
      return {...state, action: citiesActions.GET_CITIES, done: false};
    case citiesActions.GET_CITIES_SUCCESS:
      return {...state, data: action.payload, done: true};
    case citiesActions.GET_CITIES_ERROR:
      return {...state, done: true, error: action.payload};
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getCitiesState = createFeatureSelector<State>('cities');
export const getAllCities = createSelector(getCitiesState, (state: State) => state.data);
