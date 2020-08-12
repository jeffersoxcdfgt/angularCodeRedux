import * as teamActions from './teams.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Team} from '../shared/team';

export interface State {
  data: Team[];
  selected: Team;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
      /*************************
     * GET all teams actions
     ************************/
    case teamActions.GET_TEAMS:
      return {
        ...state,
        action: teamActions.GET_TEAMS,
        done: false,
        selected: null,
        error: null
      };
    case teamActions.GET_TEAMS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case teamActions.GET_TEAMS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * GET team by id actions
     ************************/
    case teamActions.GET_TEAM:
      return {
        ...state,
        action: teamActions.GET_TEAM,
        done: false,
        selected: null,
        error: null
      };
    case teamActions.GET_TEAM_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case teamActions.GET_TEAM_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * CREATE team actions
     ************************/
    case teamActions.CREATE_TEAM:
      return {
        ...state,
        selected: action.payload,
        action: teamActions.CREATE_TEAM,
        done: false,
        error: null
      };
    case teamActions.CREATE_TEAM_SUCCESS:
      {
        const newTeam = {
          ...state.selected,
          id: action.payload
        };
        const data = [
          ...state.data,
          newTeam
        ];
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case teamActions.CREATE_TEAM_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * UPDATE team actions
     ************************/
    case teamActions.UPDATE_TEAM:
      return {
        ...state,
        selected: action.payload,
        action: teamActions.UPDATE_TEAM,
        done: false,
        error: null
      };
    case teamActions.UPDATE_TEAM_SUCCESS:
      {
        const index = state
          .data
          .findIndex(h => h.id === state.selected.id);
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
    case teamActions.UPDATE_TEAM_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * DELETE team actions
     ************************/
    case teamActions.DELETE_TEAM:
      {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: teamActions.DELETE_TEAM,
          done: false,
          error: null
        };
      }
    case teamActions.DELETE_TEAM_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== state.selected.id);
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case teamActions.DELETE_TEAM_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getTeamsState = createFeatureSelector < State > ('teams');
export const getAllTeams = createSelector(getTeamsState, (state: State) => state.data);
export const getTeam = createSelector(getTeamsState, (state: State) => {
  if (state.action === teamActions.GET_TEAM && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isDeleted = createSelector(getTeamsState, (state: State) =>
  state.action === teamActions.DELETE_TEAM && state.done && !state.error);
export const isCreated = createSelector(getTeamsState, (state: State) =>
 state.action === teamActions.CREATE_TEAM && state.done && !state.error);
export const isUpdated = createSelector(getTeamsState, (state: State) =>
 state.action === teamActions.UPDATE_TEAM && state.done && !state.error);

export const getDeleteError = createSelector(getTeamsState, (state: State) => {
  return state.action === teamActions.DELETE_TEAM
    ? state.error
   : null;
});
export const getCreateError = createSelector(getTeamsState, (state: State) => {
  return state.action === teamActions.CREATE_TEAM
    ? state.error
   : null;
});
export const getUpdateError = createSelector(getTeamsState, (state: State) => {
  return state.action === teamActions.UPDATE_TEAM
    ? state.error
   : null;
});
export const getTeamsError = createSelector(getTeamsState, (state: State) => {
  return state.action === teamActions.GET_TEAMS
    ? state.error
   : null;
});
export const getTeamError = createSelector(getTeamsState, (state: State) => {
  return state.action === teamActions.GET_TEAM
    ? state.error
   : null;
});
