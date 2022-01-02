import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormValidationModule } from '../form-validation/form-validation.module';
import { LinkComponent } from './link/link.component';
import { TextComponent } from './text/text.component';

@NgModule({
  imports: [
    CommonModule,
    FormValidationModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [LinkComponent, TextComponent],
  exports: [LinkComponent, TextComponent],
})
export class EditModule {}
