import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareWithUserPageRoutingModule } from './share-with-user-routing.module';

import { ShareWithUserPage } from './share-with-user.page';
import { FormValidationModule } from 'src/app/components/form-validation/form-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormValidationModule,
    IonicModule,
    ReactiveFormsModule,
    ShareWithUserPageRoutingModule,
  ],
  declarations: [ShareWithUserPage],
})
export class ShareWithUserPageModule {}
