import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedTextsPageRoutingModule } from './shared-texts-routing.module';

import { SharedTextsPage } from './shared-texts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedTextsPageRoutingModule
  ],
  declarations: [SharedTextsPage]
})
export class SharedTextsPageModule {}
