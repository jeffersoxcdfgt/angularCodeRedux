import { NgModule } from '@angular/core';
import { MunicipiosService } from './store/services/municipios.service';
import { municipiosRoutedComponents , MunicipiosRoutingModule} from './municipios-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { MunicipioEffects } from './store/effects/municipios.effects';
import  * as municipiosReducers from './store/reducers/municipios.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

export const reducers: ActionReducerMap<any> = {
  municipios:municipiosReducers.reducer,
}

@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    MunicipiosRoutingModule,
    //StoreModule.forRoot(reducers),
    //EffectsModule.forRoot([MunicipioEffects]),
    StoreModule.forFeature('municipios', municipios.reducer),
    EffectsModule.forFeature([MunicipioEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge:25
    })
  ],
  declarations:[municipiosRoutedComponents],
  providers:[ MunicipiosService , TraceService ]
})
export class MunicipiosModule {

}
