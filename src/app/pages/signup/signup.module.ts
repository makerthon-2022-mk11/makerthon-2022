import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './signup-routing.module';

import { SignUpPage } from './signup.page';
import { FormValidationComponent } from 'src/app/components/form-validation/form-validation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SignUpPage, FormValidationComponent],
})
export class SignUpPageModule {}
