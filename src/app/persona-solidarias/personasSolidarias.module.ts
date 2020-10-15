import { NgModule } from '@angular/core';
import { PersonasSolidariasService } from './store/services/personasSolidarias.service';
import { personasSolidariasRoutedComponents , PersonasSolidariasRoutingModule} from './personasSolidarias-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { PersonaSolidariaEffects } from './store/effects/personasSolidarias.effects';
import  * as personasSolidariasReducers from './store/reducers/personasSolidarias.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

export const reducers: ActionReducerMap<any> = {
  personassolidarias:personasSolidariasReducers.reducer,
  router: routerReducer
}

@NgModule({
  imports:[
    SharedModule,
    PersonasSolidariasRoutingModule,
    StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([PersonaSolidariaEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule
  ],
  declarations:[personasSolidariasRoutedComponents],
  providers:[ PersonasSolidariasService , TraceService ]
})
export class PersonasSolidariasModule {

}
