import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CirurgiasApagarPage } from './cirurgias-apagar.page';

const routes: Routes = [
  {
    path: '',
    component: CirurgiasApagarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CirurgiasApagarPageRoutingModule {}
