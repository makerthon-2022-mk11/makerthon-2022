import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TextComponent } from './text.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [TextComponent],
  exports: [TextComponent],
})
export class TextModule {}
