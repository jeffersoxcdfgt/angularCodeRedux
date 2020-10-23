import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// components
import { UsuariosComponent } from './usuarios.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';

import { AuthService } from './store/services/auth.service';
import { AuthGuardService as AuthGuard } from './store/services/auth-guard.service';

export const loginRoutes: Routes = <Routes>[{
  path: '',
  component: UsuariosComponent,
  children: [
    {path: '', component: UsuarioLoginComponent},    
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}

export const loginRoutedComponents = [
  UsuariosComponent,
  UsuarioLoginComponent
];
