import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCollectionImagesPage } from './my-collection-images.page';

const routes: Routes = [
  {
    path: '',
    component: MyCollectionImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCollectionImagesPageRoutingModule {}
