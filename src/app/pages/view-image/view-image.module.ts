import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewImagePageRoutingModule } from './view-image-routing.module';

import { ViewImagePage } from './view-image.page';
import { EditModule } from 'src/app/components/edit/edit.module';

@NgModule({
  imports: [
    CommonModule,
    EditModule,
    FormsModule,
    IonicModule,
    ViewImagePageRoutingModule,
  ],
  declarations: [ViewImagePage],
})
export class ViewImagePageModule {}
