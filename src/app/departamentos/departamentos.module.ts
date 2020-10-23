import { NgModule } from '@angular/core';
import { DepartamentosService } from './store/services/departamentos.service';
import { departamentosRoutedComponents , DepartamentosRoutingModule} from './departamentos-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { DepartamentoEffects } from './store/effects/departamentos.effects';
import  * as departamentosReducers from './store/reducers/departamentos.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

export const reducers: ActionReducerMap<any> = {
  departamentos:departamentosReducers.reducer
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    DepartamentosRoutingModule,
    //StoreModule.forRoot(reducers),
    //EffectsModule.forRoot([DepartamentoEffects]),
    StoreModule.forFeature('departamentos', departamentosReducers.reducer),
    EffectsModule.forFeature([DepartamentoEffects]),    
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule,
    /*StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge:25
    })*/
  ],
  declarations:[departamentosRoutedComponents],
  providers:[ DepartamentosService , TraceService ]
})
export class DepartamentosModule {

}
