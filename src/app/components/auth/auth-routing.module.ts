import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/service/auth/guard/auth-guard.service';

import { AuthPage } from './auth.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/'},

      {path: 'register', component: RegisterPage, canActivate: [AuthGuardService]},
      {path: 'login', component: LoginPage, canActivate: [AuthGuardService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
