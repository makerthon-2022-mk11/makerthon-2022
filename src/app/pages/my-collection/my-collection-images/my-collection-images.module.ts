import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCollectionImagesPageRoutingModule } from './my-collection-images-routing.module';

import { MyCollectionImagesPage } from './my-collection-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCollectionImagesPageRoutingModule
  ],
  declarations: [MyCollectionImagesPage]
})
export class MyCollectionImagesPageModule {}
