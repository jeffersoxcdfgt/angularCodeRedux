import { NgModule } from '@angular/core';
import { TiposSolicitudService } from './store/services/tipossolicitud.service';
import { tipossolicitudRoutedComponents , TiposSolicitudRoutingModule} from './tipo-solicitudes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { TipoSolicitudEffects } from './store/effects/tipossolicitud.effects';
import  * as tipossolicitudReducers from './store/reducers/tipossolicitud.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports:[
    SharedModule,
    TiposSolicitudRoutingModule,
    StoreModule.forFeature('tipossolicitud', tipossolicitudReducers.reducer),
    EffectsModule.forFeature([TipoSolicitudEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule,
  ],
  declarations:[tipossolicitudRoutedComponents],
  providers:[ TiposSolicitudService , TraceService ]
})
export class TiposSolicitudModule {

}
