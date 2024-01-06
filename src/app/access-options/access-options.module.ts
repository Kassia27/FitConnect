import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessOptionsPageRoutingModule } from './access-options-routing.module';

import { AccessOptionsPage } from './access-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessOptionsPageRoutingModule
  ],
  declarations: [AccessOptionsPage]
})
export class AccessOptionsPageModule {}
