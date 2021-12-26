import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { routePaths } from './constants/routing.constants';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: routePaths.HOME,
    pathMatch: 'full',
  },
  {
    path: routePaths.HOME,
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: routePaths.LOGIN,
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: routePaths.RESET_PASSWORD,
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: routePaths.SIGNUP,
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignUpPageModule),
  },
  {
    path: routePaths.UPLOAD,
    loadChildren: () =>
      import('./pages/upload/upload.module').then((m) => m.UploadPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: routePaths.MY_COLLECTION,
    loadChildren: () => import('./pages/my-collection/my-collection.module').then( m => m.MyCollectionPageModule)
  },
  // {
  //   path: routePaths.MY_COLLECTION_ALL,
  //   loadChildren: () => import('./pages/my-collection/my-collection-all/my-collection-all.module').then( m => m.MyCollectionAllPageModule)
  // },
  // {
  //   path: routePaths.MY_COLLECTION_TEXT,
  //   loadChildren: () => import('./pages/my-collection/my-collection-text/my-collection-text.module').then( m => m.MyCollectionTextPageModule)
  // },
  // {
  //   path: routePaths.MY_COLLECTION_LINKS,
  //   loadChildren: () => import('./pages/my-collection/my-collection-links/my-collection-links.module').then( m => m.MyCollectionLinksPageModule)
  // },
  // {
  //   path: routePaths.MY_COLLECTION_IMAGES,
  //   loadChildren: () => import('./pages/my-collection/my-collection-images/my-collection-images.module').then( m => m.MyCollectionImagesPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
