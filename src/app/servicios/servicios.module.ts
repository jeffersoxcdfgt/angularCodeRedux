import { NgModule } from '@angular/core';
import { serviciosRoutedComponents , ServiciosRoutingModule} from './servicios-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { TraceService } from '../shared/utils/traceService';

import { ServicioEffects } from './store/effects/servicios.effects';
import  * as serviciosReducers from './store/reducers/servicios.reducers';
import { ServiciosService } from './store/services/servicios.service';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
//import { OrderModule } from 'ngx-order-pipe';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

export const reducers: ActionReducerMap<any> = {
  servicios:serviciosReducers.reducer
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    ServiciosRoutingModule,
    /*StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([ServicioEffects]),*/
    StoreModule.forFeature('servicios', serviciosReducers.reducer),
    EffectsModule.forFeature([ServicioEffects]),
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
    serviciosRoutedComponents,
    /*crossCountryValuePipe,
    crossCollegeValuePipe,
    crossPositionValuePipe,
    crossTeamValuePipe*/
  ],
  providers:[
    TraceService,
    ServiciosService
  ]
})
export class ServiciosModule {

}
