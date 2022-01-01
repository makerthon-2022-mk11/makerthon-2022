import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedImagesPageRoutingModule } from './shared-images-routing.module';

import { SharedImagesPage } from './shared-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedImagesPageRoutingModule
  ],
  declarations: [SharedImagesPage]
})
export class SharedImagesPageModule {}
