import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendAllPage } from './send-all.page';

const routes: Routes = [
  {
    path: '',
    component: SendAllPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendAllPageRoutingModule {}
