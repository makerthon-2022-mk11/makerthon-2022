import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendImagePageRoutingModule } from './send-image-routing.module';

import { SendImagePage } from './send-image.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormValidationModule,
    IonicModule,
    ReactiveFormsModule,
    SendImagePageRoutingModule,
  ],
  declarations: [SendImagePage],
})
export class SendImagePageModule {}
