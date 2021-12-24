import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareByUserPageRoutingModule } from './share-by-user-routing.module';

import { ShareByUserPage } from './share-by-user.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormValidationModule,
    IonicModule,
    ReactiveFormsModule,
    ShareByUserPageRoutingModule,
  ],
  declarations: [ShareByUserPage],
})
export class ShareByUserPageModule {}
