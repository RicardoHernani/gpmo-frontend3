import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcedimentosBuscarInserirPage } from './procedimentos-buscar-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: ProcedimentosBuscarInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcedimentosBuscarInserirPageRoutingModule {}
