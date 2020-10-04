import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { IvasComponent } from './ivas.component';
import { IvaListComponent } from './iva-list/iva-list.component';
import { IvaCreateComponent } from './iva-create/iva-create.component';
import { IvaDetailComponent } from './iva-detail/iva-detail.component';
import { IvaEditComponent } from './iva-edit/iva-edit.component';


const ivasRoutes : Routes  =  <Routes>[{
  path:'',
  component :IvasComponent,
  children:[
    { path:'' , component:  IvaListComponent },
    { path:'detail/:id' , component: IvaDetailComponent },
    { path:'create' ,  component:IvaCreateComponent },
    { path:'edit/:id',  component: IvaEditComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(ivasRoutes)
  ],
  exports:[RouterModule]
})
export class IvasRoutingModule {
}

export const ivasRoutedComponents = [
  IvasComponent,
  IvaListComponent,
  IvaCreateComponent,
  IvaDetailComponent,
  IvaEditComponent
]
