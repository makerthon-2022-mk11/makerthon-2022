import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendTextPageRoutingModule } from './send-text-routing.module';

import { SendTextPage } from './send-text.page';
import { TextComponent } from 'src/app/components/text/text.component';

@NgModule({
  imports: [CommonModule, IonicModule, SendTextPageRoutingModule],
  declarations: [SendTextPage, TextComponent],
})
export class SendTextPageModule {}
