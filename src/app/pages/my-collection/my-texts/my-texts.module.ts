import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTextsPageRoutingModule } from './my-texts-routing.module';

import { MyTextsPage } from './my-texts.page';
import { CollectionListsModule } from 'src/app/components/collection-lists/collection-lists.module';

@NgModule({
  imports: [
    CommonModule,
    CollectionListsModule,
    FormsModule,
    IonicModule,
    MyTextsPageRoutingModule,
  ],
  declarations: [MyTextsPage],
})
export class MyTextsPageModule {}
