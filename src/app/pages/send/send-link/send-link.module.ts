import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendLinkPageRoutingModule } from './send-link-routing.module';

import { SendLinkPage } from './send-link.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormValidationModule,
    IonicModule,
    ReactiveFormsModule,
    SendLinkPageRoutingModule,
  ],
  declarations: [SendLinkPage],
})
export class SendLinkPageModule {}
