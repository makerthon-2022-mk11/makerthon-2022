import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewLinkPageRoutingModule } from './view-link-routing.module';

import { ViewLinkPage } from './view-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLinkPageRoutingModule
  ],
  declarations: [ViewLinkPage]
})
export class ViewLinkPageModule {}
