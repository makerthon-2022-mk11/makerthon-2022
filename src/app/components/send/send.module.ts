import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SendComponent } from './send.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [SendComponent],
  exports: [SendComponent],
})
export class SendModule {}
