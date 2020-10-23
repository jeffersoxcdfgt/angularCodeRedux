import { NgModule } from '@angular/core';
import { FormaPagosService } from './store/services/formaPagos.service';
import { formaPagosRoutedComponents , FormaPagosRoutingModule} from './formaPagos-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { FormaPagosEffects } from './store/effects/formaPagos.effects';
import  * as formaPagosReducers from './store/reducers/formaPagos.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

export const reducers: ActionReducerMap<any> = {
  formaspagos:formaPagosReducers.reducer,
  router: routerReducer
}

@NgModule({
  imports:[
    SharedModule,
    FormaPagosRoutingModule,
    /*StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([FormaPagosEffects]),*/
    StoreModule.forFeature('formaspagos', formaPagosReducers.reducer),
    EffectsModule.forFeature([FormaPagosEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule
  ],
  declarations:[formaPagosRoutedComponents],
  providers:[ FormaPagosService , TraceService ]
})
export class FormaPagosModule {

}
