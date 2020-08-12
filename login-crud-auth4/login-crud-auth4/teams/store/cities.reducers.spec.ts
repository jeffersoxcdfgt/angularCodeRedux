import {State, reducer} from './cities.reducers';
import { City } from '../shared/city';
import { GetAllCities, GET_CITIES, GetAllCitiesSuccess, GetAllCitiesError } from './cities.actions';

const MOCK_DATA: City[] = [
    {
        'id': 1,
        'name': 'Cali',
        'checked': false
    }, {
        'id': 2,
        'name': 'Medellin',
        'checked': false
    }, {
        'id': 3,
        'name': 'Bogota',
        'checked': false
    }
];

let state: State = {
    data: [],
    action: null,
    done: false,
    error: null
};

describe('Load all Cities REDUCER', () => {
    it('should reduce the action GET_CITIES', () => {
        const action = new GetAllCities();
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            action: GET_CITIES,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_CITIES_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllCitiesSuccess(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            data: payload,
            done: true
        });
        state = newState;
    });
    it('should reduce the action GET_CITIES_ERROR', () => {
        const payload = new Error('Error loading all cities');
        const action = new GetAllCitiesError(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});
