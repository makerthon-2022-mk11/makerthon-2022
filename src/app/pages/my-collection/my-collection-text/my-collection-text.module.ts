import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCollectionTextPageRoutingModule } from './my-collection-text-routing.module';

import { MyCollectionTextPage } from './my-collection-text.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCollectionTextPageRoutingModule
  ],
  declarations: [MyCollectionTextPage]
})
export class MyCollectionTextPageModule {}
