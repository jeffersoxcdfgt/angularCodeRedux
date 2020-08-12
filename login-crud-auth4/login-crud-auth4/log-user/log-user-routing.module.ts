import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// components
import {LogUserComponent} from './log-user.component';
import {LogInComponent} from './log-in/log-in.component';
import {StatusComponent} from './status/status.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

export const loginRoutes: Routes = <Routes>[{
  path: '',
  component: LogUserComponent,
  children: [
    {path: '', component: LogInComponent},
    {path: 'status', component: StatusComponent , canActivate: [AuthGuard]},
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
  LogUserComponent,
  LogInComponent,
  StatusComponent
];
