import { createFeatureSelector } from '@ngrx/store';
import * as fromGames from './games/store/games.reducers';
import * as fromPlatforms from './games/store/platforms.reducers';
import * as fromTeams from './teams/store/teams.reducers';
import * as fromCities from './teams/store/cities.reducers';
import * as auth from './log-user/store/reducers/auth.reducers';

export interface AppState {
  games: fromGames.State;
  platforms: fromPlatforms.State;
  teams: fromTeams.State;
  cities: fromCities.State;
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
