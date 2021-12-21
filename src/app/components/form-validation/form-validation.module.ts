import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormValidationComponent } from './form-validation.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [FormValidationComponent],
  exports: [FormValidationComponent],
})
export class FormValidationModule {}
