import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedCollectionPageRoutingModule } from './shared-collection-routing.module';

import { SharedCollectionPage } from './shared-collection.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedCollectionPageRoutingModule,
    SuperTabsModule,
  ],
  declarations: [SharedCollectionPage],
})
export class SharedCollectionPageModule {}
