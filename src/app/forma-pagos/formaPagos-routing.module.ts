import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { FormaPagosComponent } from './formaPagos.component';
import { FormaPagoListComponent } from './forma-pago-list/forma-pago-list.component';
import { FormaPagoCreateComponent } from './forma-pago-create/forma-pago-create.component';
import { FormaPagoDetailComponent } from './forma-pago-detail/forma-pago-detail.component';
import { FormaPagoEditComponent } from './forma-pago-edit/forma-pago-edit.component';

const formaPagosRoutes : Routes  =  <Routes>[{
  path:'',
  component :FormaPagosComponent,
  children:[
    { path:'' , component:  FormaPagoListComponent },
    { path:'detail/:id' , component: FormaPagoDetailComponent  },
    { path:'create' , component:  FormaPagoCreateComponent },
    { path:'edit/:id',  component: FormaPagoEditComponent}
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(formaPagosRoutes)
  ],
  exports:[RouterModule]
})
export class FormaPagosRoutingModule {
}

export const formaPagosRoutedComponents = [
  FormaPagosComponent,
  FormaPagoListComponent,
  FormaPagoCreateComponent,
  FormaPagoDetailComponent,
  FormaPagoEditComponent
]
