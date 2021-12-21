import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadImagePageRoutingModule } from './upload-image-routing.module';

import { UploadImagePage } from './upload-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadImagePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UploadImagePage],
})
export class UploadImagePageModule {}
