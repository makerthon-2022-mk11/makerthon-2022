import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLinkPage } from './view-link.page';

const routes: Routes = [
  {
    path: '',
    component: ViewLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLinkPageRoutingModule {}
