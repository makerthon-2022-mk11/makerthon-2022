import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SendImagePageRoutingModule } from './send-image-routing.module';

import { SendImagePage } from './send-image.page';
import { ImageComponent } from 'src/app/components/image/image.component';
import { ShareModalComponent } from 'src/app/components/share-modal/share-modal.component';

@NgModule({
  imports: [CommonModule, IonicModule, SendImagePageRoutingModule],
  declarations: [SendImagePage, ImageComponent, ShareModalComponent],
  entryComponents: [ShareModalComponent],
})
export class SendImagePageModule {}
