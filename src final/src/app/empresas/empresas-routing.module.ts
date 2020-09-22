import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { EmpresasComponent } from './empresas.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaCreateComponent } from './empresa-create/empresa-create.component';
import { EmpresaDetailComponent } from './empresa-detail/empresa-detail.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';


const empresasRoutes : Routes  =  <Routes>[{
  path:'',
  component :EmpresasComponent,
  children:[
    { path:'' , component:  EmpresaListComponent },
    { path:'detail/:id' , component: EmpresaDetailComponent },
    { path:'create' ,  component:EmpresaCreateComponent },
    { path:'edit/:id',  component: EmpresaEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(empresasRoutes)
  ],
  exports:[RouterModule]
})
export class EmpresasRoutingModule {
}

export const empresasRoutedComponents = [
  EmpresasComponent,
  EmpresaListComponent,
  EmpresaCreateComponent,
  EmpresaDetailComponent,
  EmpresaEditComponent
]
