import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'user-registration', loadChildren: () => import('./features/user-registration/user-registration.module').then(m => m.UserRegistrationModule) },
  { path: 'forgot-password', loadChildren: () => import('./features/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
