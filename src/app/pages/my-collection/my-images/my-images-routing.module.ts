import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyImagesPage } from './my-images.page';

const routes: Routes = [
  {
    path: '',
    component: MyImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyImagesPageRoutingModule {}
