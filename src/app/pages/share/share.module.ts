import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharePageRoutingModule } from './share-routing.module';

import { SharePage } from './share.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharePageRoutingModule,
    ReactiveFormsModule,
    FormValidationModule,
  ],
  declarations: [SharePage],
})
export class SharePageModule {}
