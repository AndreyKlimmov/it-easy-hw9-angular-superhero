import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./core/pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./core/pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./core/pages/registration-page/registration-page.module').then(m => m.RegistrationPageModule)
  },  {
    path: 'user',
    loadChildren: () => import('./core/pages/user-page/user-page.module').then(m => m.UserPageModule)
  },  {
    path: 'battle',
    loadChildren: () => import('./core/pages/battle-page/battle-page.module').then(m => m.BattlePageModule)
  },
  {
    path: '**',
    redirectTo: `home`
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
