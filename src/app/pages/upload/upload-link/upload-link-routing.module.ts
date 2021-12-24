import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadLinkPage } from './upload-link.page';

const routes: Routes = [
  {
    path: '',
    component: UploadLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadLinkPageRoutingModule {}
