import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcedimentosApagarPage } from './procedimentos-apagar.page';

const routes: Routes = [
  {
    path: '',
    component: ProcedimentosApagarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcedimentosApagarPageRoutingModule {}
