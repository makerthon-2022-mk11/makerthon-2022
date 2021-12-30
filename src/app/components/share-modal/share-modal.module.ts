import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserModule } from '../user/user.module';
import { ShareModalComponent } from './share-modal.component';

@NgModule({
  imports: [CommonModule, IonicModule, UserModule],
  declarations: [ShareModalComponent],
  exports: [ShareModalComponent],
})
export class ShareModalModule {}
