import { NgModule } from '@angular/core';
import { ivasRoutedComponents , IvasRoutingModule} from './ivas-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { TraceService } from '../shared/utils/traceService';

import { IvaEffects } from './store/effects/ivas.effects';
import  * as ivasReducers from './store/reducers/ivas.reducers';
import { IvasService } from './store/services/ivas.service';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
//import { OrderModule } from 'ngx-order-pipe';

import { AppInMemoryApi } from '../app.in-memory.api';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';



export const reducers: ActionReducerMap<any> = {
  ivas:ivasReducers.reducer
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    IvasRoutingModule,
    StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([IvaEffects]),
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
    ivasRoutedComponents,
    /*crossCountryValuePipe,
    crossCollegeValuePipe,
    crossPositionValuePipe,
    crossTeamValuePipe*/
  ],
  providers:[
    TraceService,
    IvasService
  ]
})
export class IvasModule {

}
