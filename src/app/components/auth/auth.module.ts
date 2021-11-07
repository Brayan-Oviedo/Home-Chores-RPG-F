import { NgModule } from '@angular/core';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { RegisterPage } from './register/register.page';
import { LoginPage } from './login/login.page';

@NgModule({
  imports: [
    SharedModule,
    AuthPageRoutingModule
  ],
  declarations: [
    AuthPage,
    RegisterPage,
    LoginPage
  ]
})
export class AuthPageModule {}
