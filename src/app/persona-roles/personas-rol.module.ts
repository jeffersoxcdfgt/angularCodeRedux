import { NgModule } from '@angular/core';
import { PersonasRolService } from './store/services/personas-rol.service';
import { personasrolRoutedComponents , PersonasRolRoutingModule} from './personas-rol-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { PersonaRolEffects } from './store/effects/personas-rol.effects';
import  * as personasRolReducers from './store/reducers/personas-rol.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports:[
    SharedModule,
    PersonasRolRoutingModule,
    StoreModule.forFeature('personasrolget', personasRolReducers.reducer),
    EffectsModule.forFeature([PersonaRolEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule
  ],
  declarations:[personasrolRoutedComponents],
  providers:[ PersonasRolService , TraceService ]
})
export class PersonasRolModule {

}
