import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routePaths } from 'src/app/constants/routing.constants';

import { SharedCollectionPage } from './shared-collection.page';

const routes: Routes = [
  {
    path: '',
    component: SharedCollectionPage,
    children: [
      {
        path: routePaths.SHARED_COLLECTION_IMAGES,
        loadChildren: () =>
          import('./shared-images/shared-images.module').then(
            (m) => m.SharedImagesPageModule
          ),
      },
      {
        path: routePaths.SHARED_COLLECTION_LINKS,
        loadChildren: () =>
          import('./shared-links/shared-links.module').then(
            (m) => m.SharedLinksPageModule
          ),
      },
      {
        path: routePaths.SHARED_COLLECTION_TEXTS,
        loadChildren: () =>
          import('./shared-texts/shared-texts.module').then(
            (m) => m.SharedTextsPageModule
          ),
      },
      {
        path: '',
        redirectTo: routePaths.SHARED_COLLECTION_IMAGES,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedCollectionPageRoutingModule {}
