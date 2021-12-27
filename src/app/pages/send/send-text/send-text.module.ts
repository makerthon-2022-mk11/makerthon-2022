import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendTextPageRoutingModule } from './send-text-routing.module';

import { SendTextPage } from './send-text.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormValidationModule,
    IonicModule,
    ReactiveFormsModule,
    SendTextPageRoutingModule,
  ],
  declarations: [SendTextPage],
})
export class SendTextPageModule {}
