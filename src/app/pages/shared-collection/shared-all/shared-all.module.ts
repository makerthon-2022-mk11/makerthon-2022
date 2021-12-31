import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedAllPageRoutingModule } from './shared-all-routing.module';

import { SharedAllPage } from './shared-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedAllPageRoutingModule
  ],
  declarations: [SharedAllPage]
})
export class SharedAllPageModule {}
