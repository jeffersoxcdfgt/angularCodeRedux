import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { RolComponent } from './roles.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { RolCreateComponent } from './rol-create/rol-create.component';
import { RolDetailComponent } from './rol-detail/rol-detail.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';


const rolesRoutes : Routes  =  <Routes>[{
  path:'',
  component :RolComponent,
  children:[
    { path:'' , component:  RolListComponent },
    { path:'detail/:id' , component: RolDetailComponent },
    { path:'create' ,  component:RolCreateComponent },
    { path:'edit/:id',  component: RolEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(rolesRoutes)
  ],
  exports:[RouterModule]
})
export class RolesRoutingModule {
}

export const rolesRoutedComponents = [
  RolComponent,
  RolListComponent,
  RolCreateComponent,
  RolDetailComponent,
  RolEditComponent
]
