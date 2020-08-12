import {Action} from '@ngrx/store';
import {Team} from '../shared/team';
import {City} from '../shared/city';

export const GET_CITIES = '[ALL] Cities';
export const GET_CITIES_SUCCESS = '[ALL] Cities Success';
export const GET_CITIES_ERROR = '[ALL] Cities Error';

/****************************************
 * GET all the cities
 ****************************************/
export class GetAllCities implements Action {
  readonly type = GET_CITIES;
}

export class GetAllCitiesSuccess implements Action {
  readonly type = GET_CITIES_SUCCESS;

  constructor(public payload: City[]) {
  }
}

export class GetAllCitiesError implements Action {
  readonly type = GET_CITIES_ERROR;

  constructor(public payload: Error) {
  }
}
