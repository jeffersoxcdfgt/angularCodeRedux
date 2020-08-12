import {
    GetAllTeams,
    GET_TEAMS,
    GET_TEAMS_SUCCESS,
    GetAllTeamsSuccess,
    GetAllTeamsError,
    GET_TEAMS_ERROR,
    GetTeam,
    GET_TEAM,
    GetTeamSuccess,
    GET_TEAM_SUCCESS,
    GetTeamError,
    GET_TEAM_ERROR,
    AddTeam,
    CREATE_TEAM,
    AddTeamSuccess,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_ERROR,
    AddTeamError,
    RemoveTeam,
    DELETE_TEAM,
    RemoveTeamSuccess,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_ERROR,
    RemoveTeamError,
    UpdateTeam,
    UPDATE_TEAM,
    UpdateTeamSuccess,
    UPDATE_TEAM_ERROR,
    UpdateTeamError,
    UPDATE_TEAM_SUCCESS
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
/****************************************
 * GET all the teams
 ****************************************/
describe('Load All Teams ACTION', () => {
    it('should create the action GET_TEAMS', () => {
        const action = new GetAllTeams();
        expect({...action}).toEqual({type: GET_TEAMS});
    });
    it('should create the action GET_TEAMS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllTeamsSuccess(payload);
        expect({...action}).toEqual({type: GET_TEAMS_SUCCESS, payload});
    });
    it('should create the action GET_TEAMS_ERROR', () => {
        const payload = new Error('Error loading all teams');
        const action = new GetAllTeamsError(payload);
        expect({...action}).toEqual({
            type: GET_TEAMS_ERROR, payload
        });
    });
});
/****************************************
 * GET team by id
 ****************************************/
describe('Load specific Team ACTION', () => {
    it('should create the action GET_TEAM', () => {
        const payload = MOCK_DATA[0].id;
        const action = new GetTeam(payload);
        expect({...action}).toEqual({ type: GET_TEAM, payload });
    });
    it('should create the action GET_TEAM_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetTeamSuccess(payload);
        expect({...action}).toEqual({ type: GET_TEAM_SUCCESS, payload });
    });
    it('should create the action GET_TEAM_ERROR', () => {
        const payload = new Error('Error loading the team');
        const action = new GetTeamError(payload);
        expect({...action}).toEqual({
            type: GET_TEAM_ERROR, payload
        });
    });
});

/****************************************
 * ADD new team
 ****************************************/
describe('Create new Team ACTION', () => {
    it('should create the action CREATE_TEAM', () => {
        const payload = MOCK_DATA[1];
        const action = new AddTeam(payload);
        expect({...action}).toEqual({
            type: CREATE_TEAM, payload
        });
    });
    it('should create the action CREATE_TEAM_SUCCESS', () => {
        const payload = MOCK_DATA[1].id;
        const action = new AddTeamSuccess(payload);
        expect({...action}).toEqual({ type: CREATE_TEAM_SUCCESS, payload });
    });
    it('should create the action CREATE_TEAM_ERROR', () => {
        const payload = new Error('Error while adding a new team');
        const action = new AddTeamError(payload);
        expect({...action}).toEqual({ type: CREATE_TEAM_ERROR, payload });
    });
});
/****************************************
 * REMOVE a team by id
 ****************************************/
describe('Remove a Team ACTION', () => {
    it('should create the action DELETE_TEAM', () => {
        const payload = MOCK_DATA[1].id;
        const action = new RemoveTeam(payload);
        expect({...action}).toEqual({ type: DELETE_TEAM, payload });
    });
    it('should create the action DELETE_TEAM_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveTeamSuccess(payload);
        expect({...action}).toEqual({ type: DELETE_TEAM_SUCCESS, payload });
    });
    it('should create the action DELETE_TEAM_ERROR', () => {
        const payload = new Error('Error removing team.');
        const action = new RemoveTeamError(payload);
        expect({...action}).toEqual({ type: DELETE_TEAM_ERROR, payload });
    });
});
/****************************************
 * UPDATE team by id
 ****************************************/
describe('Update a Team ACTION', () => {
    it('should create the action UPDATE_TEAM', () => {
        const payload = MOCK_DATA[0];
        const action = new UpdateTeam(payload);
        expect({...action}).toEqual({ type: UPDATE_TEAM, payload });
    });
    it('should create the action UPDATE_TEAM_SUCCESS', () => {
        const action = new UpdateTeamSuccess();
        expect({...action}).toEqual({type: UPDATE_TEAM_SUCCESS});
    });
    it('should create the action UPDATE_TEAM_ERROR', () => {
        const payload = new Error('Error updating team.');
        const action = new UpdateTeamError(payload);
        expect({...action}).toEqual({
            type: UPDATE_TEAM_ERROR, payload
        });
    });
});
