import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTextsPage } from './my-texts.page';

const routes: Routes = [
  {
    path: '',
    component: MyTextsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTextsPageRoutingModule {}
