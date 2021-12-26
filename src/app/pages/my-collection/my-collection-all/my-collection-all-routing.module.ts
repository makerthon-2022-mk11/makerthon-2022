import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCollectionAllPage } from './my-collection-all.page';

const routes: Routes = [
  {
    path: '',
    component: MyCollectionAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCollectionAllPageRoutingModule {}
