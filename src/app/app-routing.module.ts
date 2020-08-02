import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';

//Components
import { PageNotFoundComponent } from './shared/not-found/not-found.component';

const routes:Routes = [
  { path:'' , redirectTo:'/roles' , pathMatch:'full'},
  {
    path:'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  },
  {
    path:'zonas',
    loadChildren: () => import('./zonas/zonas.module').then(m => m.ZonasModule)
  },
  {
    path:'ivas',
    loadChildren: () => import('./ivas/ivas.module').then(m => m.IvasModule)
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
  {
    path:'departamentos',
    loadChildren: () => import('./departamentos/departamentos.module').then(m => m.DepartamentosModule)
  },
  {
    path:'municipios',
    loadChildren: () => import('./municipios/municipios.module').then(m => m.MunicipiosModule)
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes,{useHash:true})],
  exports:[RouterModule]
})
export class AppRoutingModule {

}
