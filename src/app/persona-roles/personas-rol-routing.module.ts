import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { PersonasRolComponent } from './personas-rol.component';
import { PersonaRoleListComponent } from './persona-role-list/persona-role-list.component';

const personasrolRoutes : Routes  =  <Routes>[{
  path:'',
  component :PersonasRolComponent,
  children:[
    { path:'' , component:  PersonaRoleListComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(personasrolRoutes)
  ],
  exports:[RouterModule]
})
export class PersonasRolRoutingModule {
}

export const personasrolRoutedComponents = [
  PersonasRolComponent,
  PersonaRoleListComponent
]
