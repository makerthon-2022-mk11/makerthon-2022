import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routePaths } from 'src/app/constants/routing.constants';

import { MyCollectionPage } from './my-collection.page';

const routes: Routes = [
  {
    path: '',
    component: MyCollectionPage,
    children: [
      {
        path: routePaths.MY_COLLECTION_IMAGES,
        loadChildren: () =>
          import('./my-images/my-images.module').then(
            (m) => m.MyImagesPageModule
          ),
      },
      {
        path: routePaths.MY_COLLECTION_LINKS,
        loadChildren: () =>
          import('./my-links/my-links.module').then((m) => m.MyLinksPageModule),
      },
      {
        path: routePaths.MY_COLLECTION_TEXTS,
        loadChildren: () =>
          import('./my-texts/my-texts.module').then((m) => m.MyTextsPageModule),
      },
      {
        path: '',
        redirectTo: routePaths.MY_COLLECTION_IMAGES,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCollectionPageRoutingModule {}
