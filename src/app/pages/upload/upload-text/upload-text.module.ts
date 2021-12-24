import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadTextPageRoutingModule } from './upload-text-routing.module';

import { UploadTextPage } from './upload-text.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormValidationModule,
    IonicModule,
    ReactiveFormsModule,
    UploadTextPageRoutingModule,
  ],
  declarations: [UploadTextPage],
})
export class UploadTextPageModule {}
