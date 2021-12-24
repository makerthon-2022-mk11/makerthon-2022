import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routePaths } from 'src/app/constants/routing.constants';

import { SharePage } from './share.page';

const routes: Routes = [
  {
    path: '',
    component: SharePage,
    children: [
      {
        path: routePaths.SHARE_WITH_USER,
        loadChildren: () =>
          import('./share-with-user/share-with-user.module').then(
            (m) => m.ShareWithUserPageModule
          ),
      },
      {
        path: routePaths.SHARE_BY_USER,
        loadChildren: () =>
          import('./share-by-user/share-by-user.module').then(
            (m) => m.ShareByUserPageModule
          ),
      },
      {
        path: '',
        redirectTo: routePaths.SHARE_WITH_USER,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharePageRoutingModule {}
