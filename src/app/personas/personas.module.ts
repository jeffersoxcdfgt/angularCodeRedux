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


export const reducers: ActionReducerMap<any> = {
  personas:personasReducers.reducer
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    PersonasRoutingModule,
    StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([PersonaEffects]),
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
    personasRoutedComponents,
    /*crossCountryValuePipe,
    crossCollegeValuePipe,
    crossPositionValuePipe,
    crossTeamValuePipe*/
  ],
  providers:[
    TraceService,
    PersonasService
  ]
})
export class PersonasModule {

}
