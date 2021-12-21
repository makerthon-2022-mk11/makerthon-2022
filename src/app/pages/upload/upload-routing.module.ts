import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routePaths } from 'src/app/constants/routing.constants';

import { UploadPage } from './upload.page';

const routes: Routes = [
  {
    path: '',
    component: UploadPage,
    children: [
      {
        path: routePaths.UPLOAD_IMAGE,
        loadChildren: () =>
          import('./upload-image/upload-image.module').then(
            (m) => m.UploadImagePageModule
          ),
      },
      {
        path: routePaths.UPLOAD_LINK,
        loadChildren: () =>
          import('./upload-link/upload-link.module').then(
            (m) => m.UploadLinkPageModule
          ),
      },
      {
        path: routePaths.UPLOAD_TEXT,
        loadChildren: () =>
          import('./upload-text/upload-text.module').then(
            (m) => m.UploadTextPageModule
          ),
      },
      {
        path: '',
        redirectTo: routePaths.UPLOAD_IMAGE,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadPageRoutingModule {}
