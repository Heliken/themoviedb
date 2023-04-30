import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './login-page.component';
import { LoginFormModule } from '../../components/login-form/login-form.module';

@NgModule({
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent],
  imports: [CommonModule, LoginFormModule],
})
export class LoginPageModule {}
