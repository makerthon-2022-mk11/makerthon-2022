import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SendTextPageRoutingModule } from './send-text-routing.module';

import { SendTextPage } from './send-text.page';
import { TextComponent } from 'src/app/components/text/text.component';
import { ShareModalComponent } from 'src/app/components/share-modal/share-modal.component';

@NgModule({
  imports: [CommonModule, IonicModule, SendTextPageRoutingModule],
  declarations: [SendTextPage, TextComponent, ShareModalComponent],
  entryComponents: [ShareModalComponent],
})
export class SendTextPageModule {}
