import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCollectionAllPageRoutingModule } from './my-collection-all-routing.module';

import { MyCollectionAllPage } from './my-collection-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCollectionAllPageRoutingModule
  ],
  declarations: [MyCollectionAllPage]
})
export class MyCollectionAllPageModule {}
