import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { FacturasComponent } from './facturas.component';
import { FacturaListComponent } from './factura-list/factura-list.component';
import { FacturaCreateComponent } from './factura-create/factura-create.component';
import { FacturaDetailComponent } from './factura-detail/factura-detail.component';
import { FacturaEditComponent } from './factura-edit/factura-edit.component';
import { FacturaDeleteComponent } from './factura-delete/factura-delete.component';
import { FacturaViewComponent } from './factura-view/factura-view.component';

const faturasRoutes : Routes  =  <Routes>[{
  path:'',
  component :FacturasComponent,
  children:[
    { path:'' , component:  FacturaListComponent },
    { path:'detail/:id' , component: FacturaDetailComponent  },
    { path:'create' , component:  FacturaCreateComponent },
    { path:'edit',  component: FacturaEditComponent },
    { path:'delete',  component: FacturaDeleteComponent },
    { path:'view',  component: FacturaViewComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(faturasRoutes)
  ],
  exports:[RouterModule]
})
export class FacturasRoutingModule {
}

export const facturasRoutedComponents = [
  FacturasComponent,
  FacturaListComponent,
  FacturaCreateComponent,
  FacturaDetailComponent,
  FacturaEditComponent,
  FacturaDeleteComponent,
  FacturaViewComponent
]
