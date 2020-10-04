import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { ContratosComponent } from './contratos.component';
import { ContratoListComponent } from './contrato-list/contrato-list.component';
import { ContratoCreateComponent } from './contrato-create/contrato-create.component';
import { ContratoDetailComponent } from './contrato-detail/contrato-detail.component';
import { ContratoEditComponent } from './contrato-edit/contrato-edit.component';


const contratosRoutes : Routes  =  <Routes>[{
  path:'',
  component :ContratosComponent,
  children:[
    { path:'' , component:  ContratoListComponent },
    { path:'detail/:id' , component: ContratoDetailComponent },
    { path:'create' ,  component:ContratoCreateComponent },
    { path:'edit/:id',  component: ContratoEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(contratosRoutes)
  ],
  exports:[RouterModule]
})
export class ContratosRoutingModule {
}

export const contratosRoutedComponents = [
  ContratosComponent,
  ContratoListComponent,
  ContratoCreateComponent,
  ContratoDetailComponent,
  ContratoEditComponent
]
