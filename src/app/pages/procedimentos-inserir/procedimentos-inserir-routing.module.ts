import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcedimentosInserirPage } from './procedimentos-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: ProcedimentosInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcedimentosInserirPageRoutingModule {}
