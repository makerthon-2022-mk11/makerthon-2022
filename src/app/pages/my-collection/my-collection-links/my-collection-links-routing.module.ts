import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCollectionLinksPage } from './my-collection-links.page';

const routes: Routes = [
  {
    path: '',
    component: MyCollectionLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCollectionLinksPageRoutingModule {}
