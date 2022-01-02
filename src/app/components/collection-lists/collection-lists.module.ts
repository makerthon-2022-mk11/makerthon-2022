import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LinksComponent } from './links/links.component';
import { TextsComponent } from './texts/texts.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [TextsComponent, LinksComponent],
  exports: [TextsComponent, LinksComponent],
})
export class CollectionListsModule {}
