import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPageRoutingModule } from './upload-routing.module';

import { UploadPage } from './upload.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPageRoutingModule,
    ReactiveFormsModule,
    FormValidationModule,
  ],
  declarations: [UploadPage],
})
export class UploadPageModule {}
