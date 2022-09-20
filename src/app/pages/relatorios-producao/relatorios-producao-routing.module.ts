import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatoriosProducaoPage } from './relatorios-producao.page';

const routes: Routes = [
  {
    path: '',
    component: RelatoriosProducaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatoriosProducaoPageRoutingModule {}
