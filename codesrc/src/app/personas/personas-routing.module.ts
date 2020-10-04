import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { PersonasComponent } from './personas.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaCreateComponent } from './persona-create/persona-create.component';
import { PersonaDetailComponent } from './persona-detail/persona-detail.component';
import { PersonaEditComponent } from './persona-edit/persona-edit.component';


const personasRoutes : Routes  =  <Routes>[{
  path:'',
  component :PersonasComponent,
  children:[
    { path:'' , component:  PersonaListComponent },
    { path:'detail/:id' , component: PersonaDetailComponent },
    { path:'create' ,  component:PersonaCreateComponent },
    { path:'edit/:id',  component: PersonaEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(personasRoutes)
  ],
  exports:[RouterModule]
})
export class PersonasRoutingModule {
}

export const personasRoutedComponents = [
  PersonasComponent,
  PersonaListComponent,
  PersonaCreateComponent,
  PersonaDetailComponent,
  PersonaEditComponent
]
