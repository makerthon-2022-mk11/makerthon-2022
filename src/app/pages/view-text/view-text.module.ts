import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTextPageRoutingModule } from './view-text-routing.module';

import { ViewTextPage } from './view-text.page';
import { EditModule } from 'src/app/components/edit/edit.module';

@NgModule({
  imports: [
    CommonModule,
    EditModule,
    FormsModule,
    IonicModule,
    ViewTextPageRoutingModule,
  ],
  declarations: [ViewTextPage],
})
export class ViewTextPageModule {}
