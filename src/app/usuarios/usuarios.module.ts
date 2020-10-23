import {NgModule} from '@angular/core';
import {AuthService} from './store/services/auth.service';
import {AuthGuardService} from './store/services/auth-guard.service';
import {TokenInterceptor, ErrorInterceptor } from './store/services/token.interceptor';

import {loginRoutedComponents, LoginRoutingModule} from './usuarios-routing.module';
import {SharedModule} from '../shared/shared.module';

// ngrx elements
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {AuthEffects} from './store/effects/auth.effects';
import * as auth from './store/reducers/auth.reducers';


@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    StoreModule.forFeature('auth', auth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [loginRoutedComponents],
  providers: [
    AuthService, AuthGuardService,TokenInterceptor,ErrorInterceptor
  ]
})
export class LoginModule {
}
