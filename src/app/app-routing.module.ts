import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';

//Components
import { PageNotFoundComponent } from './shared/not-found/not-found.component';
import { UsuarioLoginComponent } from './usuarios/usuario-login/usuario-login.component';

const routes:Routes = [
  { path:'' , redirectTo:'/roles' , pathMatch:'full'},
  {
    path:'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  },
  {
    path:'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.LoginModule)
  },
  {
    path:'ivas',
    loadChildren: () => import('./ivas/ivas.module').then(m => m.IvasModule)
  },
  {
    path:'zonas',
    loadChildren: () => import('./zonas/zonas.module').then(m => m.ZonasModule)
  },
  {
    path:'sectores',
    loadChildren: () => import('./sectores/sectores.module').then(m => m.SectoresModule)
  },
  {
    path:'empresas',
    loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule)
  },
  {
    path:'personas',
    loadChildren: () => import('./personas/personas.module').then(m => m.PersonasModule)
  },
  {
    path:'contratos',
    loadChildren: () => import('./contratos/contratos.module').then(m => m.ContratosModule)
  },
  {
    path:'servicios',
    loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule)
  },
  /*{
    path:'departamentos',
    loadChildren: () => import('./departamentos/departamentos.module').then(m => m.DepartamentosModule)
  },
  {
    path:'municipios',
    loadChildren: () => import('./municipios/municipios.module').then(m => m.MunicipiosModule)
  },*/
  {
    path:'facturas',
    loadChildren: () => import('./facturas/facturas.module').then(m => m.FacturasModule)
  },
  {
    path:'ordenesservicios',
    loadChildren: () => import('./orden-servicios/orden-servicios.module').then(m => m.OrdenesServiciosModule)
  },
  /*{
    path:'personassolidarias',
    loadChildren: () => import('./persona-solidarias/personasSolidarias.module').then(m => m.PersonasSolidariasModule)
  },*/
  /*{
    path:'formaPagos',
    loadChildren: () => import('./forma-pagos/formaPagos.module').then(m => m.FormaPagosModule)
  },*/
  /*{
    path:'tipossolicitud',
    loadChildren: () => import('./tipo-solicitudes/tipo-solicitudes.module').then(m => m.TiposSolicitudModule)
  },*/
  /*{
    path:'estadossolicitud',
    loadChildren: () => import('./estado-solicitudes/estadossolicitud.module').then(m => m.EstadosSolicitudModule)
  },*/
  /*{
    path:'personasrol',
    loadChildren: () => import('./persona-roles/personas-rol.module').then(m => m.PersonasRolModule)
  },*/
  {
    path:'menus',
    loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule)
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports:[
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports:[
    RouterModule
  ],
  providers:[]
})
export class AppRoutingModule {

}
