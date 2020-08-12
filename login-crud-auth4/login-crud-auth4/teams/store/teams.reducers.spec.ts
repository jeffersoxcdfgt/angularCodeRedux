import {State, reducer} from './teams.reducers';
import {
    GET_TEAMS,
    GetAllTeams,
    GetAllTeamsSuccess,
    GET_TEAMS_ERROR,
    GetAllTeamsError,
    GetTeam,
    GET_TEAM,
    GetTeamSuccess,
    GetTeamError,
    CREATE_TEAM,
    CREATE_TEAM_ERROR,
    AddTeamSuccess,
    AddTeamError,
    AddTeam,
    UPDATE_TEAM,
    UpdateTeam,
    UpdateTeamSuccess,
    UpdateTeamError,
    DELETE_TEAM,
    RemoveTeam,
    RemoveTeamSuccess,
    RemoveTeamError
} from './teams.actions';
import {Team} from '../shared/team';

const MOCK_DATA: Team[] = [
    {
        id: 1,
        image: 'picture.jpg',
        name: 'Team 1',
        releaseDate: new Date(),
        platforms: [1],
        description: 'Descripion of Team 1',
        cities: [1]
    }, {
        id: 2,
        image: 'picture2.jpg',
        name: 'Team 2',
        releaseDate: new Date(),
        platforms: [2],
        description: 'Descripion of Team 2',
        cities: [2]
    }
];

let state: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

describe('Load all Teams REDUCER', () => {
    it('should reduce the action GET_TEAMS', () => {
        const action = new GetAllTeams();
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            action: GET_TEAMS,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_TEAMS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllTeamsSuccess(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            data: payload,
            done: true
        });
        state = newState;
    });
    it('should reduce the action GET_TEAMS_ERROR', () => {
        const payload = new Error('Error loading all teams');
        const action = new GetAllTeamsError(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('GET Team by id REDUCER', () => {
    it('should reduce the action GET_TEAM', () => {
        const payload = MOCK_DATA[0].id;
        const action = new GetTeam(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            action: GET_TEAM,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_TEAM_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetTeamSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action GET_TEAM_ERROR', () => {
        const payload = new Error('Error loading the team');
        const action = new GetTeamError(payload);
        const newState = reducer(state, action);
        expect({...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('Create new team REDUCER', () => {
    it('should reduce the action CREATE_TEAM', () => {
        const payload = {
            id: 3,
            image: 'picture3.jpg',
            name: 'Team 3',
            releaseDate: new Date(),
            platforms: [1, 2],
            description: 'Descripion of Team 3'
        };
        const action = new AddTeam(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            action: CREATE_TEAM,
            done: false
        });
        state = newState;
    });
    it('should reduce the action CREATE_TEAM_SUCCESS', () => {
        const payload = 3;
        const action = new AddTeamSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            data: [
                ...state.data,
                {
                    ...state.selected,
                    id: payload
                }
            ],
            selected: null,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action CREATE_TEAM_ERROR', () => {
        const payload = new Error('Error creating the team');
        const action = new AddTeamError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: null,
            done: true,
            error: payload
        });
    });
});

describe('Update existing team REDUCER', () => {
    it('should reduce the action UPDATE_TEAM', () => {
        const payload = {...MOCK_DATA[0], description: 'Descripion of Team 1 edited'};
        const action = new UpdateTeam(payload);
        const newState = reducer(state, action);
        expect({ ...newState}).toEqual({
            ...state,
            selected: payload,
            action: UPDATE_TEAM,
            done: false
        });
        state = newState;
    });
    it('should reduce the action UPDATE_TEAM_SUCCESS', () => {
        const index = 0;
        const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
        ];
        const action = new UpdateTeamSuccess();
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, data, done: true, selected: null, error: null});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action UPDATE_TEAM_ERROR', () => {
        const payload = new Error('Error updating the team');
        const action = new UpdateTeamError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});

describe('Deleting existing team REDUCER', () => {
    it('should reduce the action DELETE_TEAM', () => {
        const selected = MOCK_DATA[1];
        const payload = selected.id;
        const action = new RemoveTeam(payload);
        const newState = reducer(state, action);

        expect({ ...newState}).toEqual({
            ...state,
            selected,
            action: DELETE_TEAM,
            done: false
        });
        state = newState;
    });
    it('should reduce the action DELETE_TEAM_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveTeamSuccess(payload);
        const data = state.data.filter(h => h.id !== state.selected.id);
        const newState = reducer(state, action);
        expect({...newState}).toEqual( {...state, data, selected: null, done: true});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action DELETE_TEAM_ERROR', () => {
        const payload = new Error('Error while deleting the team');
        const action = new RemoveTeamError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});
