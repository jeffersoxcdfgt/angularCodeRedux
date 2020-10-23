import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {CUSTOM_ELEMENTS_SCHEMA , NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule }   from './shared/shared.module';
import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TraceService } from './shared/utils/traceService';

import { RolEffects } from './roles/store/effects/roles.effects';
import  * as rolesReducers from './roles/store/reducers/roles.reducers';
import { RolesService } from './roles/store/services/roles.service';

import { UsuarioEffects } from './usuarios/store/effects/usuarios.effects';
import  * as usuariosReducers from './usuarios/store/reducers/usuarios.reducers';
import { UsuarioService } from './usuarios/store/services/usuarios.service';

import { IvaEffects } from './ivas/store/effects/ivas.effects';
import  * as ivasReducers from './ivas/store/reducers/ivas.reducers';
import { IvasService } from './ivas/store/services/ivas.service';

import { DepartamentoEffects } from './departamentos/store/effects/departamentos.effects';
import  * as departamentosReducers from './departamentos/store/reducers/departamentos.reducers';
import { DepartamentosService } from './departamentos/store/services/departamentos.service';

import { MunicipioEffects } from './municipios/store/effects/municipios.effects';
import  * as municipiosReducers from './municipios/store/reducers/municipios.reducers';
import { MunicipiosService } from './municipios/store/services/municipios.service';

import { EmpresaEffects } from './empresas/store/effects/empresas.effects';
import  * as empresasReducers from './empresas/store/reducers/empresas.reducers';
import { EmpresasService } from './empresas/store/services/empresas.service';

import { PersonaEffects } from './personas/store/effects/personas.effects';
import  * as personasReducers from './personas/store/reducers/personas.reducers';
import { PersonasService } from './personas/store/services/personas.service';

import { ServicioEffects } from './servicios/store/effects/servicios.effects';
import  * as serviciosReducers from './servicios/store/reducers/servicios.reducers';
import { ServiciosService } from './servicios/store/services/servicios.service';

import { PersonaSolidariaEffects } from './persona-solidarias/store/effects/personasSolidarias.effects';
import  * as personasSolidariasReducers from './persona-solidarias/store/reducers/personasSolidarias.reducers';
import { PersonasSolidariasService } from './persona-solidarias/store/services/personasSolidarias.service';

import { ContratoEffects } from './contratos/store/effects/contratos.effects';
import  * as contratosReducers from './contratos/store/reducers/contratos.reducers';
import { ContratosService } from './contratos/store/services/contratos.service';

import { ZonaEffects } from './zonas/store/effects/zonas.effects';
import  * as zonasReducers from './zonas/store/reducers/zonas.reducers';
import { ZonasService } from './zonas/store/services/zonas.service';

import { SectorEffects } from './sectores/store/effects/sectores.effects';
import  * as sectoresReducers from './sectores/store/reducers/sectores.reducers';
import { SectoresService } from './sectores/store/services/sectores.service';

import { FormaPagosEffects } from './forma-pagos/store/effects/formaPagos.effects';
import  * as formaPagosReducers from './forma-pagos/store/reducers/formaPagos.reducers';
import { FormaPagosService } from './forma-pagos/store/services/formaPagos.service';

import { OrdenesServicioService } from './orden-servicios/store/services/orden-servicios.service';
import { OrdenServicioEffects } from './orden-servicios/store/effects/orden-servicios.effects';
import  * as ordenesServicioReducers from './orden-servicios/store/reducers/orden-servicios.reducers';


export const reducers: ActionReducerMap<any> = {
  usuarios:usuariosReducers.reducer,
  roles:rolesReducers.reducer,
  ivas:ivasReducers.reducer,
  departamentos:departamentosReducers.reducer,
  municipios:municipiosReducers.reducer,
  empresas:empresasReducers.reducer,
  personas:personasReducers.reducer,
  servicios:serviciosReducers.reducer,
  personassolidarias:personasSolidariasReducers.reducer,
  contratos:contratosReducers.reducer,
  zonas:zonasReducers.reducer,
  sectores:sectoresReducers.reducer,
  formaspagos:formaPagosReducers.reducer,
  ordenesservicios:ordenesServicioReducers.reducer,
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers,{
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([
      RolEffects,
      UsuarioEffects,
      IvaEffects,
      DepartamentoEffects,
      MunicipioEffects,
      EmpresaEffects,
      PersonaEffects,
      ServicioEffects,
      PersonaSolidariaEffects,
      ContratoEffects,
      ZonaEffects,
      SectorEffects,
      FormaPagosEffects,
      OrdenServicioEffects
    ])
  ],
  providers: [
    RolesService,
    UsuarioService,
    TraceService,
    IvasService,
    DepartamentosService,
    MunicipiosService,
    EmpresasService,
    PersonasService,
    ServiciosService,
    PersonasSolidariasService,
    ContratosService,
    ZonasService,
    SectoresService,
    FormaPagosService,
    OrdenesServicioService
  ],
  exports:[],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
