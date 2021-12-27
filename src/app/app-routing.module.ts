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
    path: routePaths.PROFILE,
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
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
    path: routePaths.SEND,
    loadChildren: () =>
      import('./pages/send/send.module').then((m) => m.SendPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: routePaths.UPLOAD,
    loadChildren: () =>
      import('./pages/upload/upload.module').then((m) => m.UploadPageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
