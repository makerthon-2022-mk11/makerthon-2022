import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPageRoutingModule } from './upload-routing.module';

import { UploadPage } from './upload.page';
import { FormValidationComponent } from 'src/app/components/form-validation/form-validation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UploadPage, FormValidationComponent],
})
export class UploadPageModule {}
