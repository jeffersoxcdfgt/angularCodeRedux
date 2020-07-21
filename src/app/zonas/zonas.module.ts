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


export const reducers: ActionReducerMap<any> = {
  zonas:zonasReducers.reducer
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
    EffectsModule.forRoot([ZonaEffects]),
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
    ZonasService
  ]
})
export class ZonasModule {

}
