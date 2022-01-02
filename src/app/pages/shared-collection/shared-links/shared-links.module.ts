import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedLinksPageRoutingModule } from './shared-links-routing.module';

import { SharedLinksPage } from './shared-links.page';
import { CollectionListsModule } from 'src/app/components/collection-lists/collection-lists.module';

@NgModule({
  imports: [
    CommonModule,
    CollectionListsModule,
    FormsModule,
    IonicModule,
    SharedLinksPageRoutingModule,
  ],
  declarations: [SharedLinksPage],
})
export class SharedLinksPageModule {}
