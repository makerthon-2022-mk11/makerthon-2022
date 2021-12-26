import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCollectionPageRoutingModule } from './my-collection-routing.module';

import { MyCollectionPage } from './my-collection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCollectionPageRoutingModule
  ],
  declarations: [MyCollectionPage]
})
export class MyCollectionPageModule {}
