import {NgModule} from '@angular/core';
import {TeamsService} from './shared/teams.service';
import {teamsRoutedComponents, TeamsRoutingModule} from './teams-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CitiesService} from './shared/cities.service';

import {AuthService} from '../log-user/services/auth.service';
import {AuthGuardService} from '../log-user/services/auth-guard.service';
import {TokenInterceptor, ErrorInterceptor } from '../log-user/services/token.interceptor';

// ngrx elements
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TeamEffects} from './store/teams.effects';
import * as teamReducer from './store/teams.reducers';
import * as cityReducer from './store/cities.reducers';
import {CityEffects} from './store/cities.effects';

export const reducers: ActionReducerMap<any> = {
  teams: teamReducer.reducer,
  cities: cityReducer.reducer
};

@NgModule({
  imports: [
    SharedModule,
    TeamsRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TeamEffects, CityEffects])
  ],
  declarations: [teamsRoutedComponents],
  providers: [
    TeamsService, CitiesService,AuthService, AuthGuardService,TokenInterceptor,ErrorInterceptor
  ]
})
export class TeamsModule {
}
