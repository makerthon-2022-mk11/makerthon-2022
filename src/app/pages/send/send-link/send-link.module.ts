import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendLinkPageRoutingModule } from './send-link-routing.module';

import { SendLinkPage } from './send-link.page';
import { ShareModalComponent } from 'src/app/components/share-modal/share-modal.component';
import { LinkComponent } from 'src/app/components/link/link.component';

@NgModule({
  imports: [CommonModule, IonicModule, SendLinkPageRoutingModule],
  declarations: [SendLinkPage, LinkComponent, ShareModalComponent],
  entryComponents: [ShareModalComponent],
})
export class SendLinkPageModule {}
