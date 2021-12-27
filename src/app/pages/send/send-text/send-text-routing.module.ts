import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendTextPage } from './send-text.page';

const routes: Routes = [
  {
    path: '',
    component: SendTextPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendTextPageRoutingModule {}
