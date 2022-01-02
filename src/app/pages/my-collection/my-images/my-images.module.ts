import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyImagesPageRoutingModule } from './my-images-routing.module';

import { MyImagesPage } from './my-images.page';
import { CollectionListsModule } from 'src/app/components/collection-lists/collection-lists.module';

@NgModule({
  imports: [
    CommonModule,
    CollectionListsModule,
    FormsModule,
    IonicModule,
    MyImagesPageRoutingModule,
  ],
  declarations: [MyImagesPage],
})
export class MyImagesPageModule {}
