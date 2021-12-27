import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routePaths } from 'src/app/constants/routing.constants';

import { SendPage } from './send.page';

const routes: Routes = [
  {
    path: '',
    component: SendPage,
    children: [
      {
        path: routePaths.SEND_ALL,
        loadChildren: () =>
          import('./send-all/send-all.module').then((m) => m.SendAllPageModule),
      },
      {
        path: routePaths.SEND_IMAGE,
        loadChildren: () =>
          import('./send-image/send-image.module').then(
            (m) => m.SendImagePageModule
          ),
      },
      {
        path: routePaths.SEND_LINK,
        loadChildren: () =>
          import('./send-link/send-link.module').then(
            (m) => m.SendLinkPageModule
          ),
      },
      {
        path: routePaths.SEND_TEXT,
        loadChildren: () =>
          import('./send-text/send-text.module').then(
            (m) => m.SendTextPageModule
          ),
      },
      {
        path: '',
        redirectTo: routePaths.SEND_ALL,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendPageRoutingModule {}
