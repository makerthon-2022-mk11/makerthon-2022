import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedTextsPage } from './shared-texts.page';

const routes: Routes = [
  {
    path: '',
    component: SharedTextsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedTextsPageRoutingModule {}
