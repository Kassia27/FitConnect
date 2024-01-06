import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';
import { AccessOptionsPage } from './access-options.page';

const routes: Routes = [
  {
    path: '',
    component: AccessOptionsPage,
  },
  {
    path: 'register',
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessOptionsPageRoutingModule {}
