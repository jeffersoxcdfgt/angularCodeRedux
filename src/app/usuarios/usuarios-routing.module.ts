import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { UsuariosComponent } from './usuarios.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';


const usuariosRoutes : Routes  =  <Routes>[{
  path:'',
  component :UsuariosComponent,
  children:[
    { path:'' , component:  UsuarioLoginComponent }
  ]
}];


@NgModule({
  imports:[
    RouterModule.forChild(usuariosRoutes)
  ],
  exports:[RouterModule]
})
export class UsuariosRoutingModule {
}

export const usuariosRoutedComponents = [
  UsuariosComponent
]
