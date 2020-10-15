import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { PersonaSolidariaComponent } from './personasSolidarias.component';
import { PersonaSolidariaListComponent } from './persona-solidaria-list/persona-solidaria-list.component';
import { PersonaSolidariaCreateComponent } from './persona-solidaria-create/persona-solidaria-create.component';
import { PersonaSolidariaDetailComponent } from './persona-solidaria-detail/persona-solidaria-detail.component';
import { PersonaSolidariaEditComponent } from './persona-solidaria-edit/persona-solidaria-edit.component';

const personasSolidariasRoutes : Routes  =  <Routes>[{
  path:'',
  component :PersonaSolidariaComponent,
  children:[
    { path:'' , component:  PersonaSolidariaListComponent },
    { path:'detail/:id' , component: PersonaSolidariaDetailComponent  },
    { path:'create' , component:  PersonaSolidariaCreateComponent },
    { path:'edit/:id',  component: PersonaSolidariaEditComponent}
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(personasSolidariasRoutes)
  ],
  exports:[RouterModule]
})
export class PersonasSolidariasRoutingModule {
}

export const personasSolidariasRoutedComponents = [
  PersonaSolidariaComponent,
  PersonaSolidariaListComponent,
  PersonaSolidariaCreateComponent,
  PersonaSolidariaDetailComponent,
  PersonaSolidariaEditComponent
]
