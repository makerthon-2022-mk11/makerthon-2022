import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadLinkPageRoutingModule } from './upload-link-routing.module';

import { UploadLinkPage } from './upload-link.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormValidationModule,
    IonicModule,
    ReactiveFormsModule,
    UploadLinkPageRoutingModule,
  ],
  declarations: [UploadLinkPage],
})
export class UploadLinkPageModule {}
