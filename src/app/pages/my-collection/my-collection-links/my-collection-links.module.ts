import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCollectionLinksPageRoutingModule } from './my-collection-links-routing.module';

import { MyCollectionLinksPage } from './my-collection-links.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCollectionLinksPageRoutingModule
  ],
  declarations: [MyCollectionLinksPage]
})
export class MyCollectionLinksPageModule {}
