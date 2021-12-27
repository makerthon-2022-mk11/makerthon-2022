import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendLinkPage } from './send-link.page';

const routes: Routes = [
  {
    path: '',
    component: SendLinkPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendLinkPageRoutingModule {}
