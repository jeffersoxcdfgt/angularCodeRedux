import { NgModule } from '@angular/core';
import { zonasRoutedComponents , ZonasRoutingModule} from './zonas-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { TraceService } from '../shared/utils/traceService';

import { ZonaEffects } from './store/effects/zonas.effects';
import  * as zonasReducers from './store/reducers/zonas.reducers';
import { ZonasService } from './store/services/zonas.service';

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
  zonas:zonasReducers.reducer,
  departamentos:departamentosReducers.reducer,
  municipios:municipiosReducers.reducer,
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    ZonasRoutingModule,
    StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([ZonaEffects , DepartamentoEffects , MunicipioEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    NgxPaginationModule,
    FormsModule,
  ],
  declarations:[
    zonasRoutedComponents,
    /*crossCountryValuePipe,
    crossCollegeValuePipe,
    crossPositionValuePipe,
    crossTeamValuePipe*/
  ],
  providers:[
    TraceService,
    ZonasService,
    DepartamentosService,
    MunicipiosService
  ]
})
export class ZonasModule {

}
