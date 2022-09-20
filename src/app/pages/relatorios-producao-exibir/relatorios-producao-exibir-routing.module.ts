import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatoriosProducaoExibirPage } from './relatorios-producao-exibir.page';

const routes: Routes = [
  {
    path: '',
    component: RelatoriosProducaoExibirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatoriosProducaoExibirPageRoutingModule {}
