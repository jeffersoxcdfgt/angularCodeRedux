import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { ServiciosComponent } from './servicios.component';
import { ServicioListComponent } from './servicio-list/servicio-list.component';
import { ServicioCreateComponent } from './servicio-create/servicio-create.component';
import { ServicioDetailComponent } from './servicio-detail/servicio-detail.component';
import { ServicioEditComponent } from './servicio-edit/servicio-edit.component';


const serviciosRoutes : Routes  =  <Routes>[{
  path:'',
  component :ServiciosComponent,
  children:[
    { path:'' , component:  ServicioListComponent },
    { path:'detail/:id' , component: ServicioDetailComponent },
    { path:'create' ,  component:ServicioCreateComponent },
    { path:'edit/:id',  component: ServicioEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(serviciosRoutes)
  ],
  exports:[RouterModule]
})
export class ServiciosRoutingModule {
}

export const serviciosRoutedComponents = [
  ServiciosComponent,
  ServicioListComponent,
  ServicioCreateComponent,
  ServicioDetailComponent,
  ServicioEditComponent
]
