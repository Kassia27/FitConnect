import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilPage } from '../perfil/perfil.page';
import { RegisterPage } from '../register/register.page';


import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'Register',
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
