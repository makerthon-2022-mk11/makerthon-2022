import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedLinksPageRoutingModule } from './shared-links-routing.module';

import { SharedLinksPage } from './shared-links.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedLinksPageRoutingModule
  ],
  declarations: [SharedLinksPage]
})
export class SharedLinksPageModule {}
