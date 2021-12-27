import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendImagePage } from './send-image.page';

const routes: Routes = [
  {
    path: '',
    component: SendImagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendImagePageRoutingModule {}
