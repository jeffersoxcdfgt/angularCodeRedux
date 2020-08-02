import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { DepartamentosComponent } from './departamentos.component';
import { DepartamentoListComponent } from './departamento-list/departamento-list.component';
import { DepartamentoCreateComponent } from './departamento-create/departamento-create.component';
import { DepartamentoDetailComponent } from './departamento-detail/departamento-detail.component';
import { DepartamentoEditComponent } from './departamento-edit/departamento-edit.component';

const departamentosRoutes : Routes  =  <Routes>[{
  path:'',
  component :DepartamentosComponent,
  children:[
    { path:'' , component:  DepartamentoListComponent },
    { path:'detail/:id' , component: DepartamentoDetailComponent  },
    { path:'create' , component:  DepartamentoCreateComponent },
    { path:'edit/:id',  component: DepartamentoEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(departamentosRoutes)
  ],
  exports:[RouterModule]
})
export class DepartamentosRoutingModule {
}

export const departamentosRoutedComponents = [
  DepartamentosComponent,
  DepartamentoListComponent,
  DepartamentoCreateComponent,
  DepartamentoDetailComponent,
  DepartamentoEditComponent
]
