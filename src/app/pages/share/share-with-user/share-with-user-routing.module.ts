import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareWithUserPage } from './share-with-user.page';

const routes: Routes = [
  {
    path: '',
    component: ShareWithUserPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareWithUserPageRoutingModule {}
