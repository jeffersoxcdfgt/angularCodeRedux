import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { MunicipiosComponent } from './municipios.component';
import { MunicipioListComponent } from './municipio-list/municipio-list.component';
import { MunicipioCreateComponent } from './municipio-create/municipio-create.component';
import { MunicipioDetailComponent } from './municipio-detail/municipio-detail.component';
import { MunicipioEditComponent } from './municipio-edit/municipio-edit.component';

const municipiosRoutes : Routes  =  <Routes>[{
  path:'',
  component :MunicipiosComponent,
  children:[
    { path:'' , component:  MunicipioListComponent },
    { path:'detail/:id' , component: MunicipioDetailComponent  },
    { path:'create' , component:  MunicipioCreateComponent },
    { path:'edit/:id',  component: MunicipioEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(municipiosRoutes)
  ],
  exports:[RouterModule]
})
export class MunicipiosRoutingModule {
}

export const municipiosRoutedComponents = [
  MunicipiosComponent,
  MunicipioListComponent,
  MunicipioCreateComponent,
  MunicipioDetailComponent,
  MunicipioEditComponent
]
