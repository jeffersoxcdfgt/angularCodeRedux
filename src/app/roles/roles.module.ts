import { NgModule } from '@angular/core';
import { rolesRoutedComponents , RolesRoutingModule} from './roles-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { TraceService } from '../shared/utils/traceService';

import { RolEffects } from './store/effects/roles.effects';
import  * as rolesReducers from './store/reducers/roles.reducers';
import { RolesService } from './store/services/roles.service';

//Grafics components
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
//import { OrderModule } from 'ngx-order-pipe';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MenusModule } from '../menus/menus.module';


@NgModule({
  imports:[
    SharedModule,
    //HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    RolesRoutingModule,
    StoreModule.forFeature('roles', rolesReducers.reducer),
    EffectsModule.forFeature([RolEffects]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    NgxPaginationModule,
    FormsModule,
    MenusModule,
  ],
  declarations:[
    rolesRoutedComponents,
    //MenusComponent

    /*crossCountryValuePipe,
    crossCollegeValuePipe,
    crossPositionValuePipe,
    crossTeamValuePipe*/
  ],
  providers:[
    TraceService,
    RolesService
  ],
  exports:[]

})
export class RolesModule {

}
