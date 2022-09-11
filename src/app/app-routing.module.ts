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
