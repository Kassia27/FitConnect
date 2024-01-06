import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationPage } from './notification.page';
import { AccessOptionsPage } from '../access-options/access-options.page';
import { HomePagePage } from '../home-page/home-page.page';


const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  },
  {
    path: 'home',
    component: HomePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
