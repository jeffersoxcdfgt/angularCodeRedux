import {Action} from '@ngrx/store';
import {Team} from '../shared/team';

export const GET_TEAMS = '[ALL] Teams';
export const GET_TEAMS_SUCCESS = '[ALL] Teams Success';
export const GET_TEAMS_ERROR = '[ALL] Teams Error';

export const GET_TEAM = '[GET] Team';
export const GET_TEAM_SUCCESS = '[GET] Teams Success';
export const GET_TEAM_ERROR = '[GET] Teams Error';

export const CREATE_TEAM = '[CREATE] Team';
export const CREATE_TEAM_SUCCESS = '[CREATE] Team Success';
export const CREATE_TEAM_ERROR = '[CREATE] Team Error';

export const DELETE_TEAM = '[DELETE] Team';
export const DELETE_TEAM_SUCCESS = '[DELETE] Team Success';
export const DELETE_TEAM_ERROR = '[DELETE] Team Error';

export const UPDATE_TEAM = '[UPDATE] Team';
export const UPDATE_TEAM_SUCCESS = '[UPDATE] Team Success';
export const UPDATE_TEAM_ERROR = '[UPDATE] Team Error';

/****************************************
 * GET all the teams
 ****************************************/
export class GetAllTeams implements Action {
  readonly type = GET_TEAMS;
}

export class GetAllTeamsSuccess implements Action {
  readonly type = GET_TEAMS_SUCCESS;

  constructor(public payload: Team[]) {
  }
}

export class GetAllTeamsError implements Action {
  readonly type = GET_TEAMS_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET team by id
 ****************************************/
export class GetTeam implements Action {
  readonly type = GET_TEAM;

  constructor(public payload: number) {
  }
}

export class GetTeamSuccess implements Action {
  readonly type = GET_TEAM_SUCCESS;

  constructor(public payload: Team) {
  }
}

export class GetTeamError implements Action {
  readonly type = GET_TEAM_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new team
 ****************************************/
export class AddTeam implements Action {
  readonly type = CREATE_TEAM;

  constructor(public payload: Team) {
  }
}

export class AddTeamSuccess implements Action {
  readonly type = CREATE_TEAM_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddTeamError implements Action {
  readonly type = CREATE_TEAM_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * REMOVE a team by id
 ****************************************/
export class RemoveTeam implements Action {
  readonly type = DELETE_TEAM;

  constructor(public payload: number) {
  }
}

export class RemoveTeamSuccess implements Action {
  readonly type = DELETE_TEAM_SUCCESS;

  constructor(public payload: Team) {
  }
}

export class RemoveTeamError implements Action {
  readonly type = DELETE_TEAM_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * UPDATE team by id
 ****************************************/
export class UpdateTeam implements Action {
  readonly type = UPDATE_TEAM;

  constructor(public payload: Team) {
  }
}

export class UpdateTeamSuccess implements Action {
  readonly type = UPDATE_TEAM_SUCCESS;
}

export class UpdateTeamError implements Action {
  readonly type = UPDATE_TEAM_ERROR;

  constructor(public payload: Error) {
  }
}
