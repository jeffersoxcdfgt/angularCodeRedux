import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { MenusComponent } from './menus.component';
import { MenuListComponent } from './menu-list/menu-list.component';


const menusRoutes : Routes  =  <Routes>[{
  path:'',
  component :MenusComponent,
  children:[
    { path:'' , component:  MenuListComponent }
  ]
}];

@NgModule({
  imports:[
    RouterModule.forChild(menusRoutes)
  ],
  exports:[RouterModule]
})
export class MenusRoutingModule {
}

export const menusRoutedComponents = [
  MenusComponent,
  MenuListComponent,
]
