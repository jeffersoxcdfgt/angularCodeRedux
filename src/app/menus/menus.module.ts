import { NgModule  , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenusService } from './store/services/menus.service';
import { menusRoutedComponents , MenusRoutingModule} from './menus-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from './store/effects/menus.effects';
import  * as menusReducers from './store/reducers/menus.reducers';
import { TraceService } from '../shared/utils/traceService';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports:[
    SharedModule,
    MenusRoutingModule,
    StoreModule.forFeature('menus', menusReducers.reducer),
    EffectsModule.forFeature([MenuEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule
  ],
  declarations:[menusRoutedComponents],
  providers:[ MenusService , TraceService ],
  exports: [menusRoutedComponents],
})
export class MenusModule {

}
