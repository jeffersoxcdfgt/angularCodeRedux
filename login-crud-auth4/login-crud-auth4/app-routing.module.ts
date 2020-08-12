import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {PageNotFoundComponent} from './shared/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/log-user', pathMatch: 'full'},
  {
    path: 'log-user',
    loadChildren: './log-user/log-user.module#LoginModule'
  },

  {path: '', redirectTo: '/games', pathMatch: 'full'},
  {
    path: 'games',
    loadChildren: './games/games.module#GamesModule'
  },


  {path: '', redirectTo: '/teams', pathMatch: 'full'},
  {
    path: 'teams',
    loadChildren: './teams/teams.module#TeamsModule'
  },


  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
