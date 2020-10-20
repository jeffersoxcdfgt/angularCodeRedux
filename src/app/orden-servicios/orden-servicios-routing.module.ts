import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { OrdenesServiciosComponent } from './orden-servicios.component';
import { OrdenServicioListComponent } from './orden-servicio-list/orden-servicio-list.component';
import { OrdenServicioCreateComponent } from './orden-servicio-create/orden-servicio-create.component';
import { OrdenServicioDetailComponent } from './orden-servicio-detail/orden-servicio-detail.component';
import { OrdenServicioEditComponent } from './orden-servicio-edit/orden-servicio-edit.component';

import { OrdenServicioViewComponent } from './orden-servicio-view/orden-servicio-view.component';
import { OrdenServicioDeleteComponent } from './orden-servicio-delete/orden-servicio-delete.component';

const ordensServiciosRoutes : Routes  =  <Routes>[{
  path:'',
  component :OrdenesServiciosComponent,
  children:[
    { path:'' , component:  OrdenServicioListComponent },
    { path:'detail/:id' , component: OrdenServicioDetailComponent  },
    { path:'create' , component:  OrdenServicioCreateComponent },
    { path:'edit',  component: OrdenServicioEditComponent},
    { path:'view',  component: OrdenServicioViewComponent},
    { path:'delete',  component: OrdenServicioDeleteComponent}
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(ordensServiciosRoutes)
  ],
  exports:[RouterModule]
})
export class OrdenesServiciosRoutingModule {
}

export const ordenesServiciosRoutedComponents = [
  OrdenesServiciosComponent,
  OrdenServicioListComponent,
  OrdenServicioCreateComponent,
  OrdenServicioDetailComponent,
  OrdenServicioEditComponent,
  OrdenServicioViewComponent,
  OrdenServicioDeleteComponent
]
