import { NgModule } from '@angular/core';
import { sectoresRoutedComponents , SectoresRoutingModule} from './sectores-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { TraceService } from '../shared/utils/traceService';

import { SectorEffects } from './store/effects/sectores.effects';
import  * as sectoresReducers from './store/reducers/sectores.reducers';
import { SectoresService } from './store/services/sectores.service';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
//import { OrderModule } from 'ngx-order-pipe';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

/*Zonas*/
import { ZonaEffects } from '../zonas/store/effects/zonas.effects';
import  * as zonasReducers from '../zonas/store/reducers/zonas.reducers';
import { ZonasService } from '../zonas/store/services/zonas.service';

import { MenusModule } from '../menus/menus.module';


export const reducers: ActionReducerMap<any> = {
  sectores:sectoresReducers.reducer,
  zonas:zonasReducers.reducer
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    SectoresRoutingModule,
    /*StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([
      SectorEffects,
      ZonaEffects
    ]),*/
    StoreModule.forFeature('sectores', sectoresReducers.reducer),
    EffectsModule.forFeature([SectorEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    NgxPaginationModule,
    //OrderModule,
    FormsModule,
    MenusModule
    /*StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),*/
    /*StoreDevtoolsModule.instrument({
      maxAge:25
    })*/
  ],
  declarations:[
    sectoresRoutedComponents,
    /*crossCountryValuePipe,
    crossCollegeValuePipe,
    crossPositionValuePipe,
    crossTeamValuePipe*/
  ],
  providers:[
    TraceService,
    SectoresService,
    ZonasService
  ]
})
export class SectoresModule {

}
