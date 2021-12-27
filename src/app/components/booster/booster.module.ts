import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageComponent } from './image/image.component';
import { LinkComponent } from './link/link.component';
import { TextComponent } from './text/text.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ImageComponent, LinkComponent, TextComponent],
  exports: [ImageComponent, LinkComponent, TextComponent],
})
export class BoosterModule {}
