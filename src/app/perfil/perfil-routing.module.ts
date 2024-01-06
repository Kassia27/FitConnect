import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedPage } from '../feed/feed.page';
import { NotificationPage } from '../notification/notification.page';
import { PerfilPage } from './perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  },
  {
    path: 'Notification',
    component: NotificationPage
  },
  {
    path: 'feed',
    component: FeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}
