import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedImagesPage } from './shared-images.page';

const routes: Routes = [
  {
    path: '',
    component: SharedImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedImagesPageRoutingModule {}
