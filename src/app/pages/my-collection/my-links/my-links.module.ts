import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyLinksPageRoutingModule } from './my-links-routing.module';

import { MyLinksPage } from './my-links.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLinksPageRoutingModule
  ],
  declarations: [MyLinksPage]
})
export class MyLinksPageModule {}
