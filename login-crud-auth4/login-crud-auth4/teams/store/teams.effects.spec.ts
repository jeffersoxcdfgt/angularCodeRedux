import {TestBed, async} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {EffectsModule} from '@ngrx/effects';
import {TeamEffects} from './teams.effects';
import {TeamsService} from '../shared/teams.service';
import {cold} from 'jasmine-marbles';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {
  GET_TEAMS_SUCCESS,
  GET_TEAMS,
  GetAllTeamsSuccess,
  GetAllTeamsError,
  GET_TEAM,
  GetTeamSuccess,
  GetTeamError,
  UPDATE_TEAM,
  UpdateTeamSuccess,
  UpdateTeamError,
  CREATE_TEAM,
  AddTeamSuccess,
  AddTeamError,
  DELETE_TEAM,
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
    cities:[1]
  }, {
    id: 2,
    image: 'picture2.jpg',
    name: 'Team 2',
    releaseDate: new Date(),
    platforms: [2],
    description: 'Descripion of Team 2',
    cities:[2]
  }
];

describe('TeamEffects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeamEffects
      ]
    });
    service = jasmine.createSpyObj('svc', ['findAll', 'findById', 'update', 'insert', 'delete']);
  });

  describe('getAllTeams$', () => {
    it('should return a GET_TEAMS_SUCCESS action, with the teams, on success', () => {
      service.findAll.and.returnValue(Observable.of(MOCK_DATA));
      const source = cold('a', {a: {type: GET_TEAMS}});
      const effects = new TeamEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetAllTeamsSuccess(MOCK_DATA)});

      expect(effects.getAllTeams$).toBeObservable(expected);
    });

    it('should return a GET_TEAMS_ERROR action, with the error', () => {
      const error = new Error('Error loading teams');
      service.findAll.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type: GET_TEAMS}});
      const effects = new TeamEffects(new Actions(source), service);

      effects.getAllTeams$.subscribe(result => {
        expect(result).toEqual(new GetAllTeamsError(error));
      });
    });
  });

  describe('getTeam$', () => {
    it('should return a GET_TEAM_SUCCESS action, with the team found, on success', () => {
      const data = MOCK_DATA[0];
      service.findById.and.returnValue(Observable.of(data));
      const source = cold('a', {a: {type: GET_TEAM}});
      const effects = new TeamEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetTeamSuccess(data)});

      expect(effects.getTeam$).toBeObservable(expected);
    });

    it('should return a GET_TEAM_ERROR action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the team with id ${data.id}`);
      service.findById.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type: GET_TEAM}});
      const effects = new TeamEffects(new Actions(source), service);

      effects.getTeam$.subscribe(result => {
        expect(result).toEqual(new GetTeamError(error));
      });
    });
  });

  describe('updateTeam$', () => {
    it('should return a UPDATE_TEAM_SUCCESS action, without any data', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      service.update.and.returnValue(Observable.of(data));
      const source = cold('a', {a: {type: UPDATE_TEAM}});
      const effects = new TeamEffects(new Actions(source), service);
      const expected = cold('a', {a: new UpdateTeamSuccess()});

      expect(effects.updateTeam$).toBeObservable(expected);
    });

    it('should return a UPDATE_TEAM_ERROR action, with the error', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      const error = new Error(`Error updating the team with id ${data.id}`);
      service.update.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type: UPDATE_TEAM}});
      const effects = new TeamEffects(new Actions(source), service);

      effects.updateTeam$.subscribe(result => {
        expect(result).toEqual(new UpdateTeamError(error));
      });
    });
  });

  describe('createTeam$', () => {
    it('should return a CREATE_TEAM_SUCCESS action, with the team inserted, on success', () => {
      const data = {
        id: 3,
        image: 'picture3.jpg',
        name: 'Team 3',
        releaseDate: new Date(),
        platforms: [1, 2],
        description: 'Descripion of Team 3',
        cities: [1, 2]
      };
      service.insert.and.returnValue(Observable.of(data));
      const source = cold('a', {a: {type: CREATE_TEAM}});
      const effects = new TeamEffects(new Actions(source), service);
      const expected = cold('a', {a: new AddTeamSuccess(data.id)});

      expect(effects.createTeam$).toBeObservable(expected);
    });

    it('should return a CREATE_TEAM_ERROR action, with the error', () => {
      const data = {
        id: 3,
        image: 'picture3.jpg',
        name: 'Team 3',
        releaseDate: new Date(),
        platforms: [1, 2],
        description: 'Descripion of Team 3',
        cities: [1, 2]
      };
      const error = new Error(`Error adding new team with id ${data.id}`);
      service.insert.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type: CREATE_TEAM}});
      const effects = new TeamEffects(new Actions(source), service);

      effects.createTeam$.subscribe(result => {
        expect(result).toEqual(new AddTeamError(error));
      });
    });
  });

  describe('removeTeam$', () => {
    it('should return a DELETE_TEAM_SUCCESS action, with the team deleted, on success', () => {
      const data = MOCK_DATA[1];
      service.delete.and.returnValue(Observable.of(data));
      const source = cold('a', {a: {type: DELETE_TEAM}});
      const effects = new TeamEffects(new Actions(source), service);
      const expected = cold('a', {a: new RemoveTeamSuccess(data)});

      expect(effects.removeTeam$).toBeObservable(expected);
    });

    it('should return a DELETE_TEAM_ERROR action, with the error', () => {
      const data = MOCK_DATA[1];
      const error = new Error(`Error removing the team with id ${data.id}`);
      service.delete.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type: DELETE_TEAM}});
      const effects = new TeamEffects(new Actions(source), service);

      effects.removeTeam$.subscribe(result => {
        expect(result).toEqual(new RemoveTeamError(error));
      });
    });
  });
});
