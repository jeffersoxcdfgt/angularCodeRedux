import { NgModule  } from '@angular/core';
import { FacturasService } from './store/services/facturas.service';
import { facturasRoutedComponents , FacturasRoutingModule} from './facturas-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { FacturaEffects } from './store/effects/facturas.effects';
import  * as facturasReducers from './store/reducers/facturas.reducers';
import { TraceService } from '../shared/utils/traceService';

import { PersonaEffects } from '../personas/store/effects/personas.effects';
import  * as personasReducers from '../personas/store/reducers/personas.reducers';
import { PersonasService } from '../personas/store/services/personas.service';


//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FacturaEditComponent } from './factura-edit/factura-edit.component';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ContratoEffects } from '../contratos/store/effects/contratos.effects';
import  * as contratosReducers from '../contratos/store/reducers/contratos.reducers';
import { ContratosService } from '../contratos/store/services/contratos.service';
import {NgxPaginationModule} from 'ngx-pagination';

import { FormaPagosEffects } from '../forma-pagos/store/effects/formaPagos.effects';
import  * as formaPagosReducers from '../forma-pagos/store/reducers/formaPagos.reducers';
import { FormaPagosService } from '../forma-pagos/store/services/formaPagos.service';

import { MenusModule } from '../menus/menus.module';

export const reducers: ActionReducerMap<any> = {
  facturas:facturasReducers.reducer,
  contratos:contratosReducers.reducer,
  personas:personasReducers.reducer,
  router: routerReducer,
  formaspagos:formaPagosReducers.reducer,
}

@NgModule({
  imports:[
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    SharedModule,
    FacturasRoutingModule,
    /*StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([
      FacturaEffects,
      ContratoEffects,
      PersonaEffects,
      FormaPagosEffects
    ]),*/
    StoreModule.forFeature('facturas', facturasReducers.reducer),
    EffectsModule.forFeature([FacturaEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule,
    NgxPaginationModule,
    MenusModule
  ],
  declarations:[facturasRoutedComponents],
  providers:[
    FacturasService ,
    TraceService,
    ContratosService,
    PersonasService,
    FormaPagosService,
    FacturasService
 ]
})
export class FacturasModule {

}
