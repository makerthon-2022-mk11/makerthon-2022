import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedTextsPageRoutingModule } from './shared-texts-routing.module';

import { SharedTextsPage } from './shared-texts.page';
import { CollectionListsModule } from 'src/app/components/collection-lists/collection-lists.module';

@NgModule({
  imports: [
    CommonModule,
    CollectionListsModule,
    FormsModule,
    IonicModule,
    SharedTextsPageRoutingModule,
  ],
  declarations: [SharedTextsPage],
})
export class SharedTextsPageModule {}
