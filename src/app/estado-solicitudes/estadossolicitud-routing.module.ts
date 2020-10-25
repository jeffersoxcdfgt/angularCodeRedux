import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { EstadosSolicitudComponent } from './estadossolicitud.component';
import { EstadoSolicitudListComponent } from './estado-solicitud-list/estado-solicitud-list.component';

const estadossolicitudRoutes : Routes  =  <Routes>[{
  path:'',
  component :EstadosSolicitudComponent,
  children:[
    { path:'' , component:  EstadoSolicitudListComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(estadossolicitudRoutes)
  ],
  exports:[RouterModule]
})
export class EstadosSolicitudRoutingModule {
}

export const estadossolicitudRoutedComponents = [
  EstadosSolicitudComponent,
  EstadoSolicitudListComponent,
]
