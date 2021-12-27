import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendAllPageRoutingModule } from './send-all-routing.module';

import { SendAllPage } from './send-all.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormValidationModule,
    IonicModule,
    ReactiveFormsModule,
    SendAllPageRoutingModule,
  ],
  declarations: [SendAllPage],
})
export class SendAllPageModule {}
