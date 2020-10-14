import { NgModule } from '@angular/core';
import { OrdenesServicioService } from './store/services/orden-servicios.service';
import { ordenesServiciosRoutedComponents , OrdenesServiciosRoutingModule} from './orden-servicios-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { OrdenServicioEffects } from './store/effects/orden-servicios.effects';
import  * as ordenesServicioReducers from './store/reducers/orden-servicios.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';


import { ContratoEffects } from '../contratos/store/effects/contratos.effects';
import  * as contratosReducers from '../contratos/store/reducers/contratos.reducers';
import { ContratosService } from '../contratos/store/services/contratos.service';

export const reducers: ActionReducerMap<any> = {
  ordenesservicios:ordenesServicioReducers.reducer,
  router: routerReducer,
  contratos:contratosReducers.reducer,
}

@NgModule({
  imports:[
    SharedModule,
    OrdenesServiciosRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([OrdenServicioEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge:25
    })
  ],
  declarations:[ordenesServiciosRoutedComponents],
  providers:[ OrdenesServicioService , TraceService ]
})
export class OrdenesServiciosModule {

}
