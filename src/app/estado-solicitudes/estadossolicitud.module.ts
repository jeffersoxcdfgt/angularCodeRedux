import { NgModule } from '@angular/core';
import { EstadosSolicitudService } from './store/services/estadosolicitud.service';
import { estadossolicitudRoutedComponents , EstadosSolicitudRoutingModule} from './estadossolicitud-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { EstadoSolicitudEffects } from './store/effects/estadosolicitud.effects';
import  * as estadossolicitudReducers from './store/reducers/estadosolicitud.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports:[
    SharedModule,
    EstadosSolicitudRoutingModule,
    StoreModule.forFeature('estadossolicitud', estadossolicitudReducers.reducer),
    EffectsModule.forFeature([EstadoSolicitudEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule
  ],
  declarations:[estadossolicitudRoutedComponents],
  providers:[ EstadosSolicitudService , TraceService ]
})
export class EstadosSolicitudModule {

}
