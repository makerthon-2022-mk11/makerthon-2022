import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTextsPageRoutingModule } from './my-texts-routing.module';

import { MyTextsPage } from './my-texts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTextsPageRoutingModule
  ],
  declarations: [MyTextsPage]
})
export class MyTextsPageModule {}
