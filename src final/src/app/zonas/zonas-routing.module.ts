import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { ZonaComponent } from './zonas.component';
import { ZonaListComponent } from './zona-list/zona-list.component';
import { ZonaCreateComponent } from './zona-create/zona-create.component';
import { ZonaDetailComponent } from './zona-detail/zona-detail.component';
import { ZonaEditComponent } from './zona-edit/zona-edit.component';


const zonasRoutes : Routes  =  <Routes>[{
  path:'',
  component :ZonaComponent,
  children:[
    { path:'' , component:  ZonaListComponent },
    { path:'detail/:id' , component: ZonaDetailComponent },
    { path:'create' ,  component:ZonaCreateComponent },
    { path:'edit/:id',  component: ZonaEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(zonasRoutes)
  ],
  exports:[RouterModule]
})
export class ZonasRoutingModule {
}

export const zonasRoutedComponents = [
  ZonaComponent,
  ZonaListComponent,
  ZonaCreateComponent,
  ZonaDetailComponent,
  ZonaEditComponent
]
