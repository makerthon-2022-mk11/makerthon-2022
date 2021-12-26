import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCollectionPage } from './my-collection.page';

const routes: Routes = [
  {
    path: '',
    component: MyCollectionPage,
    children:
    [
      {
        path: 'my-collection-all',
        loadChildren: () =>
        import('./my-collection-all/my-collection-all.module').then(
          (m) => m.MyCollectionAllPageModule
        )
      },
      {
        path: 'my-collection-text',
        loadChildren: () =>
        import('./my-collection-text/my-collection-text.module').then(
          (m) => m.MyCollectionTextPageModule
        )
      },
      {
        path: 'my-collection-links',
        loadChildren: () =>
        import('./my-collection-links/my-collection-links.module').then(
          (m) => m.MyCollectionLinksPageModule
        )
      },
      {
        path: 'my-collection-images',
        loadChildren: () =>
        import('./my-collection-images/my-collection-images.module').then(
          (m) => m.MyCollectionImagesPageModule
        )
      },
      {
        path: '',
        redirectTo: 'my-collection/my-collection-all',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'my-collection/my-collection-all',
    pathMatch: 'full'
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCollectionPageRoutingModule {}
