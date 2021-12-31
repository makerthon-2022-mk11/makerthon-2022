import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedLinksPage } from './shared-links.page';

const routes: Routes = [
  {
    path: '',
    component: SharedLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedLinksPageRoutingModule {}
