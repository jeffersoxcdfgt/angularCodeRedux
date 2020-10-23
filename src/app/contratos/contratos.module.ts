import { NgModule } from '@angular/core';
import { contratosRoutedComponents , ContratosRoutingModule} from './contratos-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { TraceService } from '../shared/utils/traceService';

import { ContratoEffects } from './store/effects/contratos.effects';
import  * as contratosReducers from './store/reducers/contratos.reducers';
import { ContratosService } from './store/services/contratos.service';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
//import { OrderModule } from 'ngx-order-pipe';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


import { PersonaEffects } from '../personas/store/effects/personas.effects';
import  * as personasReducers from '../personas/store/reducers/personas.reducers';
import { PersonasService } from '../personas/store/services/personas.service';

import { ZonaEffects } from '../zonas/store/effects/zonas.effects';
import  * as zonasReducers from '../zonas/store/reducers/zonas.reducers';
import { ZonasService } from '../zonas/store/services/zonas.service';

import { SectorEffects } from '../sectores/store/effects/sectores.effects';
import  * as sectoresReducers from '../sectores/store/reducers/sectores.reducers';
import { SectoresService } from '../sectores/store/services/sectores.service';

import { ServicioEffects } from '../servicios/store/effects/servicios.effects';
import  * as serviciosReducers from '../servicios/store/reducers/servicios.reducers';
import { ServiciosService } from '../servicios/store/services/servicios.service';

import { PersonaSolidariaEffects } from '../persona-solidarias/store/effects/personasSolidarias.effects';
import  * as personasSolidariasReducers from '../persona-solidarias/store/reducers/personasSolidarias.reducers';
import { PersonasSolidariasService } from '../persona-solidarias/store/services/personasSolidarias.service';


export const reducers: ActionReducerMap<any> = {
  contratos:contratosReducers.reducer,
  personas:personasReducers.reducer,
  zonas:zonasReducers.reducer,
  sectores:sectoresReducers.reducer,
  servicios:serviciosReducers.reducer,
  personassolidarias:personasSolidariasReducers.reducer,
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    ContratosRoutingModule,
    /*StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([
      ContratoEffects,
      PersonaEffects,
      ZonaEffects,
      SectorEffects,
      ServicioEffects,
      PersonaSolidariaEffects
    ]),*/
    StoreModule.forFeature('contratos', contratosReducers.reducer),
    EffectsModule.forFeature([ContratoEffects]),
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
    contratosRoutedComponents,
    /*crossCountryValuePipe,
    crossCollegeValuePipe,
    crossPositionValuePipe,
    crossTeamValuePipe*/
  ],
  providers:[
    TraceService,
    ContratosService,
    PersonasService,
    ZonasService,
    SectoresService,
    ServiciosService,
    PersonasSolidariasService
  ]
})
export class ContratosModule {

}
