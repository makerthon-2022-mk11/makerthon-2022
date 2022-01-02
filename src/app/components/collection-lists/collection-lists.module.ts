import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImagesComponent } from './images/images.component';
import { LinksComponent } from './links/links.component';
import { TextsComponent } from './texts/texts.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [TextsComponent, LinksComponent, ImagesComponent],
  exports: [TextsComponent, LinksComponent, ImagesComponent],
})
export class CollectionListsModule {}
