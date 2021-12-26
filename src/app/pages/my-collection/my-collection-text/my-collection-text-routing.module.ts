import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCollectionTextPage } from './my-collection-text.page';

const routes: Routes = [
  {
    path: '',
    component: MyCollectionTextPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCollectionTextPageRoutingModule {}
