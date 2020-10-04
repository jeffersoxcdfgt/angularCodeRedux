import { NgModule } from '@angular/core';
import { empresasRoutedComponents , EmpresasRoutingModule} from './empresas-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { TraceService } from '../shared/utils/traceService';

import { EmpresaEffects } from './store/effects/empresas.effects';
import  * as empresasReducers from './store/reducers/empresas.reducers';
import { EmpresasService } from './store/services/empresas.service';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
//import { OrderModule } from 'ngx-order-pipe';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DepartamentoEffects } from '../departamentos/store/effects/departamentos.effects';
import  * as departamentosReducers from '../departamentos/store/reducers/departamentos.reducers';
import { DepartamentosService } from '../departamentos/store/services/departamentos.service';

import { MunicipioEffects } from '../municipios/store/effects/municipios.effects';
import  * as municipiosReducers from '../municipios/store/reducers/municipios.reducers';
import { MunicipiosService } from '../municipios/store/services/municipios.service';

export const reducers: ActionReducerMap<any> = {
  empresas:empresasReducers.reducer,
  departamentos:departamentosReducers.reducer,
  municipios:municipiosReducers.reducer,
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    EmpresasRoutingModule,
    StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([
      EmpresaEffects,
       DepartamentoEffects ,
       MunicipioEffects
     ]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    NgxPaginationModule,
    //OrderModule,
    FormsModule,
    /*StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),*/
    /*StoreDevtoolsModule.instrument({
      maxAge:25
    })*/
  ],
  declarations:[
    empresasRoutedComponents,
    /*crossCountryValuePipe,
    crossCollegeValuePipe,
    crossPositionValuePipe,
    crossTeamValuePipe*/
  ],
  providers:[
    TraceService,
    EmpresasService,
    DepartamentosService,
    MunicipiosService
  ]
})
export class EmpresasModule {

}
