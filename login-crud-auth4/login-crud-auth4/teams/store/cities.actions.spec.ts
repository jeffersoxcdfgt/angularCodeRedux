import {
    GetAllCities,
    GET_CITIES,
    GetAllCitiesSuccess,
    GET_CITIES_SUCCESS,
    GetAllCitiesError,
    GET_CITIES_ERROR
} from './cities.actions';
import {City} from '../shared/city';

const MOCK_DATA: City[] = [
    {
        'id': 1,
        'name': 'Cali',
        checked: false
    }, {
        'id': 2,
        'name': 'Medellin',
        checked: false
    }, {
        'id': 3,
        'name': 'Bogota',
        checked: false
    }
];

describe('Load All Cities ACTION', () => {
    it('should create the action GET_CITIES', () => {
        const action = new GetAllCities();
        expect({...action}).toEqual({type: GET_CITIES});
    });
    it('should create the action GET_CITIES_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllCitiesSuccess(payload);
        expect({...action}).toEqual({type: GET_CITIES_SUCCESS, payload});
    });
    it('should create the action GET_CITIES_ERROR', () => {
        const payload = new Error('Error loading all cities');
        const action = new GetAllCitiesError(payload);
        expect({...action}).toEqual({type: GET_CITIES_ERROR, payload});
    });
});
