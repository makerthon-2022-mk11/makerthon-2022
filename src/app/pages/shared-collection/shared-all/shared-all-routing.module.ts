import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedAllPage } from './shared-all.page';

const routes: Routes = [
  {
    path: '',
    component: SharedAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedAllPageRoutingModule {}
