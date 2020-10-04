import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { SectoresComponent } from './sectores.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { SectorCreateComponent } from './sector-create/sector-create.component';
import { SectorDetailComponent } from './sector-detail/sector-detail.component';
import { SectorEditComponent } from './sector-edit/sector-edit.component';


const sectoresRoutes : Routes  =  <Routes>[{
  path:'',
  component :SectoresComponent,
  children:[
    { path:'' , component:  SectorListComponent },
    { path:'detail/:id' , component: SectorDetailComponent },
    { path:'create' ,  component:SectorCreateComponent },
    { path:'edit/:id',  component: SectorEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(sectoresRoutes)
  ],
  exports:[RouterModule]
})
export class SectoresRoutingModule {
}

export const sectoresRoutedComponents = [
  SectoresComponent,
  SectorListComponent,
  SectorCreateComponent,
  SectorDetailComponent,
  SectorEditComponent
]
