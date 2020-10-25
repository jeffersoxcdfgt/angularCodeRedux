import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { TiposSolicitudComponent } from './tipo-solicitudes.component';
import { TipoSolicitudListComponent } from './tipo-solicitud-list/tipo-solicitud-list.component';


const tipossolicitudRoutes : Routes  =  <Routes>[{
  path:'',
  component :TiposSolicitudComponent,
  children:[
    { path:'' , component:  TipoSolicitudListComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(tipossolicitudRoutes)
  ],
  exports:[RouterModule]
})
export class TiposSolicitudRoutingModule {
}

export const tipossolicitudRoutedComponents = [
  TiposSolicitudComponent,
  TipoSolicitudListComponent
]
