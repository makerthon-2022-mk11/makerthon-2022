import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadLinkPageRoutingModule } from './upload-link-routing.module';

import { UploadLinkPage } from './upload-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadLinkPageRoutingModule
  ],
  declarations: [UploadLinkPage]
})
export class UploadLinkPageModule {}
