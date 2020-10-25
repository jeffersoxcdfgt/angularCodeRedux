import { NgModule } from '@angular/core';
import { personasRoutedComponents , PersonasRoutingModule} from './personas-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { TraceService } from '../shared/utils/traceService';

import { PersonaEffects } from './store/effects/personas.effects';
import  * as personasReducers from './store/reducers/personas.reducers';
import { PersonasService } from './store/services/personas.service';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
//import { OrderModule } from 'ngx-order-pipe';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { RolEffects } from '../roles/store/effects/roles.effects';
import  * as rolesReducers from '../roles/store/reducers/roles.reducers';
import { RolesService } from '../roles/store/services/roles.service';

import { EmpresaEffects } from '../empresas/store/effects/empresas.effects';
import  * as empresasReducers from '../empresas/store/reducers/empresas.reducers';
import { EmpresasService } from '../empresas/store/services/empresas.service';

import { MenusModule } from '../menus/menus.module';


export const reducers: ActionReducerMap<any> = {
  personas:personasReducers.reducer,
  roles:rolesReducers.reducer,
  empresas:empresasReducers.reducer
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    PersonasRoutingModule,
    /*StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([
      PersonaEffects,
      RolEffects,
      EmpresaEffects
    ]),*/
    StoreModule.forFeature('personas', personasReducers.reducer),
    EffectsModule.forFeature([EmpresaEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    NgxPaginationModule,
    FormsModule,
    MenusModule
  ],
  declarations:[
    personasRoutedComponents,
  ],
  providers:[
    TraceService,
    PersonasService,
    RolesService,
    EmpresasService
  ]
})
export class PersonasModule {

}
