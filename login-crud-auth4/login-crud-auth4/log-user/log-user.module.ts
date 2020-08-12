import {NgModule} from '@angular/core';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';

import {loginRoutedComponents, LoginRoutingModule} from './log-user-routing.module';
import {SharedModule} from '../shared/shared.module';

// ngrx elements
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {AuthEffects} from './store/effects/auth.effects';
import * as auth from './store/reducers/auth.reducers';
import { StatusComponent } from './status/status.component';


export const reducers: ActionReducerMap<any> = {
  auth: auth.reducer
};

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects])
  ],
  declarations: [loginRoutedComponents, StatusComponent],
  providers: [
    AuthService, AuthGuardService,TokenInterceptor,ErrorInterceptor
  ]
})
export class LoginModule {
}
