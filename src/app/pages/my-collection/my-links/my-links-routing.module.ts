import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLinksPage } from './my-links.page';

const routes: Routes = [
  {
    path: '',
    component: MyLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLinksPageRoutingModule {}
