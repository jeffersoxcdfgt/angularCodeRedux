import { NgModule } from '@angular/core';
import { UsuarioService } from './store/services/usuarios.service';
import { usuariosRoutedComponents , UsuariosRoutingModule} from './usuarios-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { UsuarioEffects } from './store/effects/usuarios.effects';
import  * as usuariosReducers from './store/reducers/usuarios.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


import { RolEffects } from '../roles/store/effects/roles.effects';
import  * as rolesReducers from '../roles/store/reducers/roles.reducers';
import { RolesService } from '../roles/store/services/roles.service';


@NgModule({
  imports:[
    SharedModule,
    HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    UsuariosRoutingModule,
    /*StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([
      UsuarioEffects,
    ]),*/
    StoreModule.forFeature('usuarios', usuariosReducers.reducer),
    EffectsModule.forFeature([UsuarioEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule
  ],
  declarations:[usuariosRoutedComponents],
  providers:[
    UsuarioService ,
    TraceService
  ]
})
export class UsuariosModule {

}
